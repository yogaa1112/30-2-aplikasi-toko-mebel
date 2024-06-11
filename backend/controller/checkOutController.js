const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)

const checkout =  async (req, res) => {
    const customer = await stripe.customers.create({
      metadata:{
        userId : req.body.userEmail,
        cart : JSON.stringify(req.body.cartItems)
      }
    })
    const line_items = req.body.cartItems.map(item =>{
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
          unit_amount: item.price,
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


    module.exports = checkout;