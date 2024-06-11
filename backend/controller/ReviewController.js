const mongoose = require('mongoose');
const Review = require('../model/Review');
const Product = require('../model/Product');

// Tambah review
const addReview = async (req, res) => {
  const { id, name, rating, comment } = req.body;

  try {
    console.log("ID Produk:", id);
    console.log("Nama:", name);
    console.log("Rating:", rating);
    console.log("Komentar:", comment);

    // Cari produk berdasarkan id numerik
    const product = await Product.findOne({ id: Number(id) });
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    const newReview = new Review({
      productId: product._id,  // Gunakan _id dari produk yang ditemukan
      name,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    console.error("Kesalahan saat menambah review:", error);
    res.status(500).send('Kesalahan Internal Server');
  }
};

// Dapatkan review berdasarkan productId
const getReviewsByProductId = async (req, res) => {
  const { id } = req.params;

  try {
    // Cari ulasan berdasarkan productId
    const reviews = await Review.find({ productId: id });
    res.json(reviews);
  } catch (error) {
    console.error("Kesalahan saat mengambil review:", error);
    res.status(500).send('Kesalahan Internal Server');
  }
};

module.exports = { addReview, getReviewsByProductId };
