import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState} from 'react'
import Animated,{ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown} from 'react-native-reanimated';
import { getSignedInUser, deleteUserData } from '../MyCodes/ed5'
import { useIsFocused } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import {STRIPE_API_KEY} from '@env'
import { StripeProvider, useStripe, useConfirmPayment, ConfirmSetupIntentError } from '@stripe/stripe-react-native';

const CheckOutPage = ({navigation, route}) => {
   const API_URL = 'http://localhost:4242'


    const YOUR_LAMBDA_ENDPOINT='https://9nmw6alb93.execute-api.us-east-1.amazonaws.com/Stage/capture'

    const {name, price, img, desc} = route.params? route.params : {name:undefined, price:undefined, img:undefined, desc:undefined}
    const [signedInUser, setSignedInUser] = useState()
    const [userData, setUserData] = useState()
    const navigate = (to,params) =>{navigation.navigate(to,params)}
    const toPaymentInfoPage = () => {navigate('PaymentInfoPage')}
    const {confirmPayment, loading} = useConfirmPayment();
    

    async function fetchPaymentIntentClientSecret (){
        const response = await fetch(`${API_URL}/pay`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

        })
        
        const [clientSecret, error] = await response.json()
        return {error, clientSecret}
    }

    console.log(userData?.CartToken)

    async function handleBuy(){
        const response = await fetch(YOUR_LAMBDA_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
              amount: 200,
              token:userData?.CartToken,
              currency: 'usd',
              source: {
                object: 'card',
                number: 4242424242424242,
                exp_month: userData?.userDetails?.cardDetails?.expiryMonth,
                exp_year: userData?.userDetails?.cardDetails?.expiryYear,
                cvc: 234,
              },
            }),
          });
      
          const data = await response.json();
          console.log(data);

    }
   /*  const billingDetails = {
        email: 'jenny.rosen@example.com',
    }

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${'http://localhost:4242/'}create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currency: 'usd',
          }),
        });
        const {clientSecret} = await response.json();
    
        return clientSecret;
      };
    
      const handlePayPress = async () => {
        if (!card) {
          return;
        }
        
    
        // Fetch the intent client secret from the backend.
        const clientSecret = await fetchPaymentIntentClientSecret();

        // Confirm the payment with the card details
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        });
    
        if (error) {
          console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
          console.log('Success from promise', paymentIntent);
        }
      }; */














    




    //map item names 
    const cartMap = (userData?.Cart)? Object.values(userData.Cart).map(({name, price, img, desc})=>{
      
        return( 
        <Animated.View className={''} entering={ZoomInEasyDown} exiting={FadeInUp} key={name}>

                <View className={'flex flex-row p-4 justify-between'}>
                    <Text className={' text-xl w-40 h-fit text-justify font-semibold'}>{name}</Text>
                    <Text className={'text-center flex-grow'}>${price}</Text>
                    <Text className={'flex-grow text-right'}>Qty x1</Text>
                </View>

        </Animated.View>
      ) //{name, price, img, desc}
    }) : []

    const BuyNowMap = () =>{
      
        return(
            
                <Animated.View className={''} entering={FadeInUp}>
                    <Text className={'text-3xl font-bold text-center m-2'}>Buy Now</Text>
                    <View className={'flex flex-row p-4 justify-between'}>
                        <Text className={' text-xl w-40 h-fit text-justify font-semibold'}>{name}</Text>
                        <Text className={'text-center flex-grow'}>${price}</Text>
                        <Text className={'flex-grow text-right'}>Qty x1</Text>
                    </View>
                    <Text className={'text-3xl font-semibold text-slate-600'}>Total: ${price}</Text>
                    <Text className={'text-3xl font-bold text-center m-2'}>Cart Items</Text>
                    
                    <ScrollView className={'border h-52'}>
                        {cartMap}
                    </ScrollView>
                    <Text className={'text-3xl font-semibold text-slate-600'}>Total: {userData?.CartTotal}</Text>
                </Animated.View>
             





            
        ) //{name, price, img, desc}
    }

  

    useEffect(()=>{
        getSignedInUser(setSignedInUser, setUserData)
    },[])

  return (
    <StripeProvider
            publishableKey={STRIPE_API_KEY}
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{AHW}}" // required for Apple Pay
            >
        <Animated.View className={'flex-1 h-screen w-screen'} entering={ZoomInEasyDown} exiting={ZoomOutEasyDown}>
        <SafeAreaView className={'flex flex-1 h-full '}>
        {/*TOP BAR */}
        <View className={'flex flex-row justify-between mx-2'}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <View className={'bg-white h-12 w-12 rounded-full p-2'}>
                    <Ionicons name="caret-back-circle-outline" size={32} color={'pink'}></Ionicons>
                </View>
            </TouchableOpacity>
            <View>
            <Text className={'text-slate-800 text-center font-bold text-lg'}>Checkout</Text>
            </View>
            <View className={'h-10 w-10 rounded-full overflow-hidden'}>
            </View>
        </View>

            {/* checkout Items */}
        <View className={'p-6 shadow-black shadow-md'}>
            { route.params? 
                (<View className={'border-4 p-2 h-[40rem] border-slate-300'}>
                    <BuyNowMap cartMap={cartMap} key={`${name} ${price}`}/>
                </View>) 
                : 
                (<View>
                    <Text className={'text-3xl font-bold text-center m-2'}>Cart Items</Text>
                    <ScrollView className={'border-4 p-2 border-slate-300'}>
                        {cartMap}
                    </ScrollView>
                    <Text className={'text-3xl font-semibold text-slate-600'}>Total</Text>
                </View>)
            }

        </View>
        <View className={'h-60'}>
        
        </View>

        </SafeAreaView>
        {/* Shipping Info */}
        <View className={'h-40  bottom-4 w-full p-2'}>
            <TouchableOpacity onPress={toPaymentInfoPage} className={'h-16 w-[80%] bg-white rounded-md m-auto shadow-sm shadow-black'} >
                <Text className={'font-bold text-2xl text-center m-auto'}>Shipping & Card Info</Text>
            </TouchableOpacity>
            
            </View >
        {/* CheckOut */}
        <View className={'bottom-4 flex flex-row justify-between p-4'}>
            <View className="flex flex-row w-full  m-auto justify-center">
                
                {route?.params && <TouchableOpacity  className={'w-[45%] h-24 rounded-full p-2 m-2 bg-rose-400'}>
                    <Text className={'text-4xl font-bold m-auto text-white'}>Pay Now</Text>
                </TouchableOpacity> }

                <TouchableOpacity onPress={handleBuy}  className={'w-[45%] h-24 rounded-full p-2 m-2 bg-rose-400'}>
                    <Text className={'text-4xl font-bold m-auto text-black'}>{route?.params ? 'Buy All':'Buy'}</Text>
                </TouchableOpacity> 
            </View>
        </View>


        </Animated.View>
    </StripeProvider>
  )
}

export default CheckOutPage









