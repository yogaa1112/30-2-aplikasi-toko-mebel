const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const { type } = require('os');
const { log, error } = require('console');

const connect = require('./library/db.js')
const loginRouter = require('./router/login.js');
const signupRouter = require('./router/signup.js')

app.use(logger('dev'));
app.use(express.json());
app.use(cors());



app.get('/', (req,res)=>{
    res.send('App berjalan')
})

//Penyimpanan images
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// membuat upload enpoint
app.use('/images', express.static('upload/images'))
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.post('/upload', upload.single('produk'),(req,res)=>{
    res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema untuk membuat Produk

const Product = mongoose.model("produk", {
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    //office / school / home
    category : {
        type : String,
        required : true
    },
    //Meja, Kursi, lemari, rak, dll.
    sub_category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    available : {
        type : Boolean,
        default : true
    },
})

//menambahkan produk
app.post('/addproduct', async(req, res)=>{
    let products = await Product.find({});
    let id = 1;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    const product = new Product({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        sub_category : req.body.sub_category,
        price : req.body.price,
    });
    console.log(product);
    await product.save();
    console.log("Saved")

    res.json({
        success : true,
        name : req.body.name,
    })
})

//menghapus produk
app.delete('/removeproduct', async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed")

    res.json({
        success : true,
        name : req.body.name
    })
})

//menampilkan semua produk

app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("semua Produk diambil")
    res.send(products)
})

//Endpoint untuk search bar
app.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
      const results = await Product.find({
        $or: [
          { name: new RegExp(query, 'i') },
          { category: new RegExp(query, 'i') },
          { sub_category: new RegExp(query, 'i') },
        ],
    });
    if(results.length === 0){
        
        res.send("No results found")

    }
    else
    {
        res.json(results);
    }
    } catch (error) {
      res.status(500).send(error);
    }
  });

// endpoint untuk New Collections
app.get('/new-collections', async (req, res)=>{
    let products = await Product.find({});
    let new_collection = products.slice(1).slice(-8);

    console.log('NewCollection Fetched')
    res.send(new_collection);
})

// endpoint untuk popular in office
app.get('/popular-in-office', async(req, res)=>{
    let product = await Product.find({category:"office"})
    let popular_in_office = product.slice(0, 4);

    console.log('Popular in Office fetched');
    res.send(popular_in_office);
})

// membuat middleware untuk mengambil user
const fetchUser = async (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({errors:"Token is not valid!"});
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({errors:" token tidak valid"})
    }
}

// endpoint untuk Menambahkan item ke cart di database
app.post('/addtocart',fetchUser, async(req, res)=>{
    console.log("Added", req.body.id)
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;

    await Users.findOneAndUpdate({_id:req.user.id}, {cartData : userData.cartData});
    res.send('Added');
})

// endpoint untuk menghapus produk dari cart
app.post('/removefromcart', fetchUser, async(req, res)=>{
    console.log("removed", req.body.id)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({_id:req.user.id}, {cartData : userData.cartData});
        res.send('deleted');
})

// membuat endpoint untuk mendapat cart data saat login
app.post('/getcart', fetchUser, async(req, res)=>{
    console.log('Get cart');
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, async(err)=>{
    if(!err){
        //Koneksi ke database mongoDB
        await connect ();
        console.log("Server berjalan pada port " +port)
    }
    else
    {
        console.log("Server tidak berjalan"+err)
    }
})
