const express = require('express');
const router = express.Router();
const {Webhook} = require('../controller/checkOutController.js')

router.post('/webhook', express.raw({type: 'application/json'}), Webhook);

module.exports = router;