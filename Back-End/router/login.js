const express = require('express');
const router = express.Router();
const login = require('../controller/logincontroller.js')

//Membuat API untuk User login
router.post('/', login);

module.exports = router;