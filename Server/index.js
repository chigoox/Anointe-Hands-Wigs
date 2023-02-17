const env = require('dotenv').config()
const STRIPE_API_KEY = process.env.STRIPE_API_KEY
const STRIPE_SECRETE_API_KEY = process.env.STRIPE_API_KEY
const cors =  require('cors')
const stripe = require('stripe')(STRIPE_API_KEY, {apiVersion:'2022-11-15'});
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
//console.log(process.env.STRIPE_API_KEY)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post("/test", (req, res) => {
  res.send("Data received");
});



/* app.post('/', (req, res) => {
  let data = req.body;
  res.send('Data Received: ' + JSON.stringify(data));
})


app.post('/pay', async (req, res) => {
  console.log('yay')
  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      payment_method_types: ['card'],
      costomer: coustomer.id,
      shipping: shippingDetail,
    });
    const clientSecret = paymentIntent.client_secret
  
    return res.json({
      clientSecret: clientSecret.secret,
    }) 

  } catch (error){
    res.json({error: error.message})
  }
});

 */

/*   
 */

app.listen(4242, () => console.log(`Listening on port ${4242}!`))