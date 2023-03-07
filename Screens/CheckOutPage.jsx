import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import Animated, { ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown, FadeIn, FadeInDown, SlideOutDown } from 'react-native-reanimated';
import { getSignedInUser, deleteUserCart, addUserInfoToDatabase, addAdminInfoToDatabase, fetchDocument } from '../MyCodes/ed5'
import Ionicons from '@expo/vector-icons/Ionicons';
import { STRIPE_API_KEY } from '@env'
import { StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native';
import Notification from '../Componets/Universal/Notification';
import sendMSG from '../MyCodes/sendMSG';



const CheckOutPage = ({ navigation, route }) => {

  const { name, price, img, desc, cardComplete } = route.params ? route.params : { name: undefined, price: undefined, img: undefined, desc: undefined, cardComplete: undefined }
  const [signedInUser, setSignedInUser] = useState()
  const [userData, setUserData] = useState()
  const [orderNumber, setOrderNumber] = useState()
  const [payFailError, setPayFailError] = useState({})
  const navigate = (to, params) => { navigation.navigate(to, params) }
  const toPaymentInfoPage = () => { navigate('PaymentInfoPage') }
  const { confirmPayment, loading } = useConfirmPayment();
  const _orderNumber = Number(orderNumber?.OrderNumber?.substring(5))
  const _newOrderNumber = `${orderNumber?.OrderNumber?.substring(0, 5)}${_orderNumber + 1}`
  const buyNowCart = { [name]: { desc: desc, img: img, price: price, name: name } }







  const [notificationPaymentFailed, seNotificationPaymentFailed] = useState(false)
  const toggleNotifiFailed = () => { seNotificationPaymentFailed(!notificationPaymentFailed) }

  // { notificationRemoveCart && <Notification text={'Removed from cart'} color={true} toggleNotification={toggleNotifiRemove} /> }











  async function handlePay(buynow) {
    const end = 4

    const response = await fetch(`http://172.20.10.${end}:4242/create-payment-intent`, {
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
        //cardDetails
      }
    })

    if (error) {
      setPayFailError(error.message)
      toggleNotifiFailed()

    } else if (paymentIntent) {
      const txt = `You have a new Order on AWH! Total: $${(Number(userData?.CartTotal ? userData?.CartTotal : 0) + price ? Number(price) : 0)}`
      const htmlMSG = `<h1>${_orderNumber}</h1>
                     <br/>
                     <p>You placed a new order on AWH!</p>
                     <h3>Total: $${(Number(userData?.CartTotal ? userData?.CartTotal : 0) + price ? Number(price) : 0)}</h3>
                    `

      sendMSG('+19082202312', userData.Email, `${htmlMSG}`, txt, `${_orderNumber}-New Order From AHW`)
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
        if (name) {

          addAdminInfoToDatabase({ [userData?.Name]: { [`Order ${orderNumber?.OrderNumber}`]: { items: { ...buyNowCart, ...userData?.Cart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: (Number(userData?.CartTotal ? userData?.CartTotal : 0) + Number(price)) } } }, 'Orders', 'UnfullfiledOrders')
          addUserInfoToDatabase({ Orders: { [`Order ${orderNumber?.OrderNumber}`]: { items: { ...buyNowCart, ...userData?.Cart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: (Number(userData?.CartTotal ? userData?.CartTotal : 0) + Number(price)) } } }, signedInUser)
        } else {
          addAdminInfoToDatabase({ [userData?.Name]: { [`Order ${orderNumber?.OrderNumber}`]: { items: { ...userData?.Cart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: userData?.CartTotal } } }, 'Orders', 'UnfullfiledOrders')
          addUserInfoToDatabase({ Orders: { [`Order ${orderNumber?.OrderNumber}`]: { items: { ...userData?.Cart }, OrderNumber: orderNumber?.OrderNumber, complete: false, Total: userData?.CartTotal } } }, signedInUser)
        }
      }
      if (!buynow) deleteUserCart(signedInUser)
      navigate('Shop', { PaymentComplete: [true, 'Payment successful!'] })
    }
  }

  useEffect(() => {
    fetchDocument('Orders', 'OrderNumbers', setOrderNumber)
    getSignedInUser(setSignedInUser, setUserData)

  }, [])



  //map item names 
  const cartMap = (userData?.Cart) ? Object.values(userData.Cart).map(({ name, price, img, desc }) => {

    return (
      <Animated.View className={''} entering={FadeInDown} exiting={FadeInUp} key={name}>

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



  return (
    <StripeProvider
      publishableKey={STRIPE_API_KEY}
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{AHW}}" // required for Apple Pay
    >
      <Animated.View className={'flex-1 h-screen w-screen'} entering={SlideOutDown} exiting={ZoomOutEasyDown}>
        <SafeAreaView className={'flex flex-1 h-full relative'}>
          {notificationPaymentFailed && <Notification text={`${payFailError}`} color={true} toggleNotification={toggleNotifiFailed} />}
          {loading && <View className="z-40 absolute h-screen bottom-0 top-0 flex w-full">
            <ActivityIndicator size="large" className={'m-auto text-red-900'} color={'pink'} />
          </View>}
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
            {name ?
              (<View className={'border-4 p-2 h-[40rem] border-slate-300'}>
                <BuyNowMap cartMap={cartMap} key={`${name} ${price}`} />
              </View>)
              :
              (<View>
                <Text className={'text-3xl font-bold text-center m-2'}>Cart Items</Text>
                <ScrollView className={'border-4 p-2 border-slate-300'}>
                  {cartMap}
                </ScrollView>
                <Text className={'text-3xl font-semibold text-slate-600'}>Total: {userData?.CartTotal}</Text>
              </View>)
            }

          </View>

        </SafeAreaView>
        {/* Shipping Info */}
        <View className={'h-40  bottom-4 w-full p-2'}>
          <TouchableOpacity onPress={toPaymentInfoPage} disabled={loading} className={`${cardComplete ? 'bg-emerald-400' : 'bg-white'} h-16 w-[80%]  rounded-md m-auto shadow-sm shadow-black`} >
            <Text className={'font-bold text-2xl text-center m-auto'}>Shipping & Card Info</Text>
          </TouchableOpacity>

        </View >
        {/* CheckOut */}
        <View className={'bottom-4 flex flex-row justify-between p-4'}>
          <View className="flex flex-row w-full  m-auto justify-center">
            {name && <TouchableOpacity onPress={() => { handlePay(true) }} disabled={true} className={`w-[45%] h-24 rounded-full p-2 m-2 ${cardComplete ? 'bg-emerald-400' : 'bg-rose-400'}`}>
              <Text className={'text-4xl font-bold m-auto text-white'}>Pay Now</Text>
            </TouchableOpacity>}

            <TouchableOpacity onPress={() => { handlePay(false) }} disabled={loading} className={`${cardComplete ? 'bg-emerald-400' : 'bg-rose-400'} w-[45%] h-24 rounded-full p-2 m-2 `}>
              <Text className={'text-4xl font-bold m-auto text-black'}>{name ? 'Buy All' : 'Buy'}</Text>
            </TouchableOpacity>
          </View>
        </View>


      </Animated.View>
    </StripeProvider>
  )
}

export default CheckOutPage









