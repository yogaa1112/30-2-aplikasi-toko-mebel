const express = require('express');
const router = express.Router();
const {login }= require('../controller/login-controller.js')
const fetchUser = require('../middleware/fetchUser.js')

//Membuat API untuk User login
router.post('/', login);


module.exports = router;