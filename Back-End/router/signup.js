const express = require('express');
const router = express.Router();
const signup = require('../controller/signupcontroller.js')

//Membuat API untuk User signup
router.post('/', signup);

module.exports = router;