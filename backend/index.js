const port = 4000;
const express = require('express');
const app = express();
const cors = require('cors');
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

app.use('/images', express.static('upload/images'))
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/', productRouter);


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
