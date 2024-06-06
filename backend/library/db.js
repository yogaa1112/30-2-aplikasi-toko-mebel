const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config();

const url = process.env.DB_URI

const connect = async ()=>{
    try {
        await mongoose.connect(url);
        console.log("Database berhasil dihubungkan");

    } catch (error) {
        console.log("Gagal terhubung ke database" + error.message);
    }
}

module.exports = connect;