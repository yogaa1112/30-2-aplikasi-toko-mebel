// routes/reviews.js
const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Review = require('../model/Review');

// Menambahkan review
router.post('/add', fetchUser, async (req, res) => {
  const { productId, name, rating, comment } = req.body;

  try {
    const newReview = new Review({
      productId,
      name,
      rating,
      comment
    });

    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Mengambil review berdasarkan productId
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
