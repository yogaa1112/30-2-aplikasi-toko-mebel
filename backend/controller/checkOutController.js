const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)
const Order = require('../model/order.js')

const checkout =  async (req, res) => {
  const products = req.body.cartItems;
  const produk_produk = products.map(({ image, category, sub_category, available, ...rest }) => rest);
    const customer = await stripe.customers.create({
      metadata:{
        userId : req.body.userEmail,
        cart :JSON.stringify(produk_produk)
      } 
    })
    const line_items = req.body.cartItems.map(item =>{
      const exchangeRate = 0.000061;
      const priceInUSD = Math.round((item.price * exchangeRate) * 100 );
      console.log(`Price in USD for ${item.name}: ${priceInUSD}`);
      return{
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
            description:item.category,
            metadata: {
              id: item.id
            }
          },
          unit_amount: priceInUSD,
        },
        quantity: item.quantity,
      }
    })
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        phone_number_collection : {
          enabled : true,
        },
        customer: customer.id,
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
      });
    
      res.send({url : session.url});
    };

const createOrder = async(customer, data)=>{
      const Items = JSON.parse(customer.metadata.cart);
      
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

const Webhook =  (req, res) => {
    
  const endpointSecret = process.env.EP_SECRET;
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
              // console.log(customer);
              // console.log('data:' , data);
              createOrder(customer, data)
          }
      ).catch(err=>console.log(err.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
}
    module.exports = {checkout, Webhook};