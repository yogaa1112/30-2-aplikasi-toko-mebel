const mongoose = require("mongoose");

const url = 'mongodb+srv://fery-ale:Capstone@cluster0.c8jg4an.mongodb.net/mebel'

const connect = async ()=>{
    try {
        await mongoose.connect(url);
        console.log("Database berhasil dihubungkan");

    } catch (error) {
        console.log("Gagal terhubung ke database" + error.message);
    }
}

module.exports = connect;