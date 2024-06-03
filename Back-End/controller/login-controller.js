const jwt = require('jsonwebtoken');
const Users = require('../model/user.js')

const login = async(req, res)=>{
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
}

module.exports = login;