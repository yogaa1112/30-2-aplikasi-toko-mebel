const mongoose = require('mongoose');

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
    //Office / Living / home
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

module.exports = Product;