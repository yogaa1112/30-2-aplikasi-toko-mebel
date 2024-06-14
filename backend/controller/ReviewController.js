const mongoose = require('mongoose');
const Review = require('../model/Review');
const Product = require('../model/Product');
const Order = require('../model/order');

// Fungsi untuk menambah review
const addReview = async (req, res) => {
  try {
    const { userId, productId, paymentIntentId, rating, comment } = req.body;

    const newReview = new Review({
      userId,
      productId,
      paymentIntentId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json({ message: 'Review berhasil ditambahkan', review: savedReview });
  } catch (err) {
    console.error('Kesalahan saat menambah review:', err); // Cetak error di konsol
    res.status(500).json({ error: 'Terjadi kesalahan saat menambah review' });
  }
};

// Fungsi untuk mengambil semua review
const getAllReviews = async (req, res) => {
  const productId = req.params.productId;

  try {
    const reviews = await Review.find({ productId: productId }); // Menggunakan Number, bukan ObjectId

    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};

// Fungsi untuk menghapus review
const removeReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  try {
    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
      return res.status(404).json({ message: 'Review tidak ditemukan' });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ message: 'Tidak diizinkan menghapus review ini' });
    }

    await Review.deleteOne({ _id: reviewId });
    res.json({ message: 'Review berhasil dihapus' });
  } catch (error) {
    console.error('Kesalahan saat menghapus review:', error);
    res.status(500).json({ message: 'Kesalahan Internal Server' });
  }
};


// Fungsi untuk mengedit review
const editReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId, rating, comment } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review tidak ditemukan' });
    }

    if (review.userId !== userId) {
      return res.status(403).json({ message: 'Tidak diizinkan mengedit review ini' });
    }

    review.rating = rating;
    review.comment = comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    console.error('Kesalahan saat mengedit review:', error);
    res.status(500).json({ message: 'Kesalahan Internal Server' });
  }
};

module.exports = { addReview, getAllReviews, removeReview, editReview };
