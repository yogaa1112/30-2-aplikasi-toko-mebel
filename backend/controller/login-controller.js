const jwt = require('jsonwebtoken');
const Users = require('../model/user.js')

const login = async(req, res)=>{
    //mencari email user di database
    let user = await Users.findOne({email: req.body.email});
    if(user){
        //membandingkan password yang dimasukan oleh user dengan password yang ada di database
        const passCompare = req.body.password === user.password;
        const isAdmin =  user.isAdmin;
        let url = false
        if(passCompare){
            const data = {
                user : {
                    id : user.id
                }
            }
            if(isAdmin){
               url = `${process.env.CLIENT_URL}/admin`
               const token = jwt.sign(data, process.env.SECREET_USER);
               return res.json({succes:true, token, url:url})
            }
            const token = jwt.sign(data, process.env.SECREET_USER);
            res.json({succes:true, token, url:url})
          
        }
        else{
            res.json({success:false, error:"Email/Password anda salah!"})
        }
    }
    else{
        res.json({success:false, error:"Email/password anda salah!"})
    }
}   



module.exports = {
    login
};