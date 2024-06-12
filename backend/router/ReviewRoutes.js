const express = require('express');
const router = express.Router();
const { addReview, getAllReviews } = require('../controller/ReviewController.js');
const fetchUser = require('../middleware/fetchUser.js');

// Routes for reviews
router.post('/add', fetchUser, addReview);
router.get('/:productId', getAllReviews);

module.exports = router;
