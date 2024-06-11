const express = require('express');
require('dotenv').config();

const router = express.Router();
const {
    addToCart, 
    removeFromCart, 
    addProduct, 
    removeProduct, 
    getAllProducts, 
    searchProducts, 
    getNewCollections, 
    getPopularInOffice,
    UploadIMG, 
} = require('../controller/product-controller.js');
const checkout = require('../controller/checkOutController.js')
const fetchUser = require('../middleware/fetchUser.js')
const { getProductById } = require('../controller/product-controller');
const upload = require('../middleware/UploadImg.js')

// Cart routes
router.post('/addtocart', fetchUser, addToCart);
router.post('/removefromcart', fetchUser, removeFromCart);
router.post('/checkout', checkout)

// Product routes
router.post('/upload', fetchUser, upload.single('produk'), UploadIMG)
router.post('/addproduct',fetchUser, addProduct);
router.delete('/removeproduct', fetchUser, removeProduct);
router.get('/allproducts', getAllProducts);
router.get('/search', searchProducts);
router.get('/product/:id', getProductById);
router.get('/new-collections', getNewCollections);
router.get('/popular-in-office', getPopularInOffice);

module.exports = router;
