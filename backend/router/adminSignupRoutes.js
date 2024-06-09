const express = require('express');
const router = express.Router();
const adminSignup = require('../controller/adminSignupController.js');

router.post('/', adminSignup);

module.exports = router;