const express = require('express');
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)

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
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    
    const endpointSecret = "whsec_679ed037428e5bb6169c64fa6145df68758bcba05a80a8113b3d00a1892922cc";
    let event;
    let data;
    let eventType;
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
      }
      console.log('event', event);
      data = event.data.object;
      eventType = event.type
    }
    console.log('tipe event', eventType);
    // Handle the event
    if(eventType === "checkout.session.completed"){
        stripe.customers.retrieve(data.customer).then((customer)=>{
                console.log(customer);
                console.log('data:' , data);
            }
        ).catch(err=>console.log(err.message))
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.send();
  });

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
