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

app.post('/upload', upload.single('produk'),(req,res)=>{
    res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema untuk membuat Produk

const Product = mongoose.model("Produk", {
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
    let id;
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
app.post('/removeproduct', async(req, res)=>{
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

  //Skema untuk model User
  const Users = mongoose.model('Users',{
    name : {
        type : String,

    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String,

    },
    cartData : {
        type : Object,

    },
    date : {
        type : Date,
        default : Date.now,
    }
  })

  //Membuat Enpoint untuk register User
  app.post('/signup', async(req, res)=>{
    //Mengecheck apakah email sudah dipakai di dalam database
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, error:"Email sudah dipakai!"})
    }

    let cart = {};
    for ( let i = 0; i<300; i++){
        cart[i] = 0;
    }

    const user = new Users({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        cartData : cart,
    })
    //simpan user di database
    await user.save();

    const data = {
        user:{
            id : user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success : true, token})
    
  })

//Membuat API untuk User login
app.post('/login', async(req, res)=>{
    //mencari email user di database
    let user = await Users.findOne({email: req.body.email});
    if(user){
        //membandingkan password yang dimasukan oleh user dengan password yang ada di database
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user : {
                    id : user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({succes:true, token})
        }
        else{
            res.json({success:false, error:"Password anda salah!"})
        }
    }else{
        res.json({success:false, error:"Email anda salah!"})
    }
})

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