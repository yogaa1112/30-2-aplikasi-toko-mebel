const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String, // Menggunakan email pengguna
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  paymentIntentId: {
    type: String, // ID dari transaksi pembelian
    required: true
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
