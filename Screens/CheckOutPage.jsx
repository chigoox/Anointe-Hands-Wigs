import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import Animated, { ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { getSignedInUser, deleteUserCart, addUserInfoToDatabase, addAdminInfoToDatabase, fetchDocument } from '../MyCodes/ed5'
import { useIsFocused } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { STRIPE_API_KEY } from '@env'
import { StripeProvider, useStripe, useConfirmPayment, ConfirmSetupIntentError, CardField } from '@stripe/stripe-react-native';



const CheckOutPage = ({ navigation, route }) => {


  const { name, price, img, desc } = route.params ? route.params : { name: undefined, price: undefined, img: undefined, desc: undefined }
  const [signedInUser, setSignedInUser] = useState()
  const [userData, setUserData] = useState()
  const [orderNumber, setOrderNumber] = useState()
  const [cardDetails, setCardDetails] = useState({})
  const navigate = (to, params) => { navigation.navigate(to, params) }
  const toPaymentInfoPage = () => { navigate('PaymentInfoPage') }
  const { confirmPayment, loading } = useConfirmPayment();
  const _orderNumber = Number(orderNumber?.OrderNumber?.substring(5))
  const _newOrderNumber = `${orderNumber?.OrderNumber?.substring(0, 5)}${_orderNumber + 1}`
  const buyNowCart = { [name]: { desc: desc, img: img, price: price, name: name } }

  async function handlePay(buynow) {
    const ip = '192.168.1.44'
    const response = await fetch(`http://172.20.10.4:4242/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodType: 'Card',
        currency: 'usd',
        amount: buynow ? price : route?.params?.price ? (Number(userData?.CartTotal ? userData?.CartTotal : 0) + Number(price)) : userData?.CartTotal
      })
    })
    const { clientSecret } = await response.json()
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      billingDetails: {
        name: userData.Name,
        email: userData.Email,
      },
      cardDetails: {
        cardDetails
      }
    })
    if (error) {
      Alert.alert(`Error ${error.message}`)
    } else if (paymentIntent) {
      Alert.alert(`Success ${paymentIntent.id}`)
      addAdminInfoToDatabase({ OrderNumber: _newOrderNumber }, 'Orders', 'OrderNumbers')
      if (buynow) {
        addAdminInfoToDatabase({
          [userData?.Name]: {
            [`Order ${orderNumber?.OrderNumber}`]: { items: { ...buyNowCart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: price }
          }
        }, 'Orders', 'UnfullfiledOrders');

        addUserInfoToDatabase({
          Orders:
          {
            [`Order ${orderNumber?.OrderNumber}`]:
            {
              items: { ...buyNowCart },
              OrderNumber: orderNumber?.OrderNumber,
              complete: false,
              Total: price
            }
          }
        }, signedInUser)


      } else {
        if (route.params) {
          console.log('orking')
          addAdminInfoToDatabase({ [userData?.Name]: { [`Order ${orderNumber?.OrderNumber}`]: { items: { ...buyNowCart, ...userData?.Cart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: (Number(userData?.CartTotal ? userData?.CartTotal : 0) + Number(price)) } } }, 'Orders', 'UnfullfiledOrders')
          addUserInfoToDatabase({ Orders: { [`Order ${orderNumber?.OrderNumber}`]: { items: { ...buyNowCart, ...userData?.Cart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: (Number(userData?.CartTotal ? userData?.CartTotal : 0) + Number(price)) } } }, signedInUser)
        } else {
          addAdminInfoToDatabase({ [userData?.Name]: { [`Order ${orderNumber?.OrderNumber}`]: { items: { ...userData?.Cart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: userData?.CartTotal } } }, 'Orders', 'UnfullfiledOrders')
          addUserInfoToDatabase({ Orders: { [`Order ${orderNumber?.OrderNumber}`]: { items: { ...userData?.Cart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: userData?.CartTotal } } }, signedInUser)
        }
      }
      if (!buynow) deleteUserCart(signedInUser)
      navigate('Shop', { message: 'Thank you for your purchase!' })
    }
  }


  //map item names 
  const cartMap = (userData?.Cart) ? Object.values(userData.Cart).map(({ name, price, img, desc }) => {

    return (
      <Animated.View className={''} entering={ZoomInEasyDown} exiting={FadeInUp} key={name}>

        <View className={'flex flex-row p-4 justify-between'}>
          <Text className={' text-xl w-40 h-fit text-justify font-semibold'}>{name}</Text>
          <Text className={'text-center flex-grow'}>${price}</Text>
          <Text className={'flex-grow text-right'}>Qty x1</Text>
        </View>

      </Animated.View>
    ) //{name, price, img, desc}
  }) : []

  const BuyNowMap = () => {

    return (
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
        <Text className={'text-slate-600'}>Total: {userData?.CartTotal}</Text>
        <Text className={'text-3xl font-semibold text-slate-600'}>Buy All Total: {Number(userData?.CartTotal ? userData?.CartTotal : 0) + Number(price)}</Text>
      </Animated.View>


    ) //{name, price, img, desc}
  }


  useEffect(() => {
    fetchDocument('Orders', 'OrderNumbers', setOrderNumber)
    getSignedInUser(setSignedInUser, setUserData)
  }, [])

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
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
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
            {route.params ?
              (<View className={'border-4 p-2 h-[40rem] border-slate-300'}>
                <BuyNowMap cartMap={cartMap} key={`${name} ${price}`} />
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

            {route?.params && <TouchableOpacity onPress={() => { handlePay(true) }} disabled={loading} className={'w-[45%] h-24 rounded-full p-2 m-2 bg-rose-400'}>
              <Text className={'text-4xl font-bold m-auto text-white'}>Pay Now</Text>
            </TouchableOpacity>}

            <TouchableOpacity onPress={() => { handlePay(false) }} disabled={loading} className={'w-[45%] h-24 rounded-full p-2 m-2 bg-rose-400'}>
              <Text className={'text-4xl font-bold m-auto text-black'}>{route?.params ? 'Buy All' : 'Buy'}</Text>
            </TouchableOpacity>
          </View>
        </View>


      </Animated.View>
    </StripeProvider>
  )
}

export default CheckOutPage









