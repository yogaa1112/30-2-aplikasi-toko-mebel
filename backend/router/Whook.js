const express = require('express');
const router = express.Router();
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)
const Order = require('../model/order.js')

//Membuat Order
const createOrder = async(customer, data)=>{
    const Items = JSON.parse(customer.metadata.cart);
    
    // const products = Items.map((item) => {
    //     return {
    //       productId: item.id,
    //       name : item.name,
    //       image : item.image,
    //       category: item.category,
    //       sub_category: item.sub_category,
    //       price: item.price,
    //       quantity: item.quantity,
    //     };
    //   });
    const newOrder = new Order({
        userId : customer.email,
        customerId: data.customer,
        phone: customer.phone,
        paymentIntentId: data.payment_intent,
        products:Items,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        customer: {
            name: data.customer_details.name,
            email: data.customer_details.email,
            country: data.customer_details.address.country
        },
        payment_status: data.payment_status
    });

    try {
      const saveOrder = await  newOrder.save()
      console.log("Processed Order:", saveOrder);
    } catch (err) {
        console.log(err.message);
    }
}
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    
    const endpointSecret = process.env.EP_SECREET;
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
      data = event.data.object;
      eventType = event.type
    }
    // Handle the event
    if(eventType === "checkout.session.completed"){
        stripe.customers.retrieve(data.customer).then((customer)=>{
                console.log(customer);
                console.log('data:' , data);
                createOrder(customer, data)
            }
        ).catch(err=>console.log(err.message))
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.send();
  });

  module.exports = router;