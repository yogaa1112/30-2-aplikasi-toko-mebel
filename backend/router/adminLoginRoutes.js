const express = require('express');
const router = express.Router();
const adminLogin = require('../controller/adminLoginController.js');

router.post('/', adminLogin);

module.exports = router;