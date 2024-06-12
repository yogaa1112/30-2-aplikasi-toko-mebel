const Review = require('../model/Review');
const Product = require('../model/Product');
const Order = require('../model/order');

const addReview = async (req, res) => {
  const { userId, productId, paymentIntentId, rating, comment } = req.body;

  try {
    // Cek apakah produk dan pesanan tersedia
    const product = await Product.findById(productId);
    const order = await Order.findById(paymentIntentId);
    if (!product || !order) {
      return res.status(404).json({ message: 'Produk atau pesanan tidak ditemukan' });
    }

    // Membuat instance review baru
    const newReview = new Review({
      userId, // Menggunakan email pengguna
      productId,
      paymentIntentId,
      rating,
      comment
    });

    // Menyimpan review ke dalam database
    const savedReview = await newReview.save();

    res.status(201).json(savedReview); // Mengirimkan respons dengan review yang disimpan
  } catch (error) {
    console.error('Kesalahan saat menambah review:', error);
    res.status(500).json({ message: 'Kesalahan Internal Server' });
  }
};

// Mendapatkan review berdasarkan productId
const getAllReviews = async (req, res) => {
  try {
    // Query all reviews from the database
    const reviews = await Review.find();

    // Send the reviews as JSON response
    res.status(200).json(reviews);
  } catch (error) {
    // If there's an error, send an error response
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Menghapus review berdasarkan reviewId
const removeReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review tidak ditemukan' });
    }

    // Pastikan hanya pengguna yang membuat review yang bisa menghapusnya
    if (review.userId !== userId) {
      return res.status(403).json({ message: 'Tidak diizinkan menghapus review ini' });
    }

    await review.remove();
    res.json({ message: 'Review berhasil dihapus' });
  } catch (error) {
    console.error('Kesalahan saat menghapus review:', error);
    res.status(500).json({ message: 'Kesalahan Internal Server' });
  }
};

// Mengedit review berdasarkan reviewId
const editReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId, rating, comment } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review tidak ditemukan' });
    }

    // Pastikan hanya pengguna yang membuat review yang bisa mengeditnya
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
