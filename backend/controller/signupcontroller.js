const jwt = require('jsonwebtoken');
const Users = require('../model/user.js')

const signup = async(req, res)=>{
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

    const token = jwt.sign(data, process.env.SECREET_USER);
    res.json({success : true, token})
    
  }

  module.exports = signup;