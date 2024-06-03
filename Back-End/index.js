const port = 4000;
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const logger = require('morgan');
const { type } = require('os');
const { log, error } = require('console');

const connect = require('./library/db.js')
const loginRouter = require('./router/login.js');
const signupRouter = require('./router/signup.js')
const productRouter = require('./router/productRoutes.js')

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
app.use('/', productRouter);
app.post('/upload', upload.single('produk'),(req,res)=>{
    res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    })
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
