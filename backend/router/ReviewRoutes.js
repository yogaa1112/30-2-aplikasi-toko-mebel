const express = require('express');
const router = express.Router();
const { addReview, getReviewsByProductId } = require('../controller/ReviewController.js');
const fetchUser = require('../middleware/fetchUser.js');

// Routes for reviews
router.post('/add', fetchUser, addReview);
router.get('/:productId', getReviewsByProductId);

module.exports = router;
