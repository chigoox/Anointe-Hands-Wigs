const express = require('express');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
 
require('dotenv').config({ path: './.env' })
const stripe = require('stripe')('sk_test_51MamPiLPNdUzkCF3xdRvn0nkLpOrsJFo1um4Z7e07FlQXH6T7HCHhRxYkVjkK2iPW61EMZKoDM0ml6YSdWmAPcEn00E3jb1Gcr', {
  apiVersion: '2020-08-27',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/checkout-one-time-payments",
    version: "0.0.1",
    url: "https://github.com/stripe-samples/checkout-one-time-payments"
  }
});





app.post('/create-payment-intent' ,async (req, res) =>{
    const {amount} = req.body
    const chargeAmount = (amount * 100)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: chargeAmount,
        currency: 'usd',
        
    })

    res.send({
        clientSecret: paymentIntent.client_secret,
    })
})


app.listen(4242, ()=>{
    console.log('running 4242')
})