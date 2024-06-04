const express = require('express');
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
const fetchUser = require('../middleware/fetchUser.js')
const upload = require('../middleware/UploadImg.js')

router.post('/upload', upload.single('produk'), UploadIMG)
// Cart routes
router.post('/addtocart', fetchUser, addToCart);
router.post('/removefromcart', fetchUser, removeFromCart);

// Product routes
router.post('/addproduct', addProduct);
router.delete('/removeproduct', removeProduct);
router.get('/allproducts', getAllProducts);
router.get('/search', searchProducts);
router.get('/new-collections', getNewCollections);
router.get('/popular-in-office', getPopularInOffice);

module.exports = router;
