const express = require('express');
const router = express.Router();
const Order = require('../model/order');

// dibuat untuk menampilkan orederan yang sudah dibayar dan akan di review
// Endpoint untuk mengambil semua order
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find(); // Mengambil semua order dari koleksi Order
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;