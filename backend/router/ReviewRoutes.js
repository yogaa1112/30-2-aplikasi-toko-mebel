const express = require('express');
const { addReview, getAllReviews, removeReview, editReview } = require('../controller/ReviewController');
const router = express.Router();
const fetchUser = require ('../middleware/fetchUser');

router.post('/add', fetchUser, addReview);
router.get('/:productId', getAllReviews);
router.delete('/:reviewId', fetchUser, removeReview);
router.put('/:reviewId', fetchUser, editReview);

module.exports = router;
