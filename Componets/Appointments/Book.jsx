import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp, SlideInDown, SlideInUp, ZoomInEasyDown } from 'react-native-reanimated'
import { CardField } from '@stripe/stripe-react-native'
import { StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native';
import sendMSG from '../../MyCodes/sendMSG';
import Notification from '../Universal/Notification';

const Book = ({ date, userData, toggleBooking, time }) => {
    const [cardDetails, setCardDetails] = useState()
    const { confirmPayment, loading } = useConfirmPayment();
    const [payFailError, setPayFailError] = useState({})


    const [notificationPaymentFailed, seNotificationPaymentFailed] = useState(false)
    const toggleNotifiFailed = () => { seNotificationPaymentFailed(!notificationPaymentFailed) }

    console.log(notificationPaymentFailed)

    async function handlePay() {
        const end = 4
        const response = await fetch(`http://172.20.10.${end}:4242/create-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paymentMethodType: 'Card',
                currency: 'usd',
                amount: 35
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
            setPayFailError(error.message)
            toggleNotifiFailed()
        } else if (paymentIntent) {

            setPayFailError('Appointment booked!')
            toggleNotifiFailed()
            const txt = `You have appointment!`
            const htmlMSG = `<h1>New appointment @ AHW</h1>
                     <br/>
                     <p>You placed a new appointment on AWH!</p>
                     <h3>When: ${date} @ ${time} </h3>
                    `
            console.log(userData.Email)
            sendMSG('+19082202312', userData.Email, `${htmlMSG}`, txt, `New Appointment at AHW`)




            setTimeout(() => {
                toggleBooking(true)
            }, 2000);


        }

    }


    return (
        <View className={'absolute h-full w-full z-10 '}>
            {notificationPaymentFailed && <Notification text={`${payFailError}`} color={payFailError == 'Appointment booked!' ? false : true} toggleNotification={toggleNotifiFailed} />}
            <Animated.View entering={FadeInDown} exiting={FadeOutDown} className={'h-60 w-72 rounded-xl bg-slate-900 m-auto py-1'}>
                {loading && <View className="z-40 absolute h-screen bottom-0 top-0 flex w-full">
                    <ActivityIndicator size="large" className={'m-auto text-red-900'} color={'white'} />
                </View>}
                <TouchableOpacity onPress={toggleBooking} className={'absolute right-0 z-10'}>
                    <View className={' right-0 bg-rose-700 rounded-3xl h-10 w-10 m-2 flex'}>
                        <Text className={'font-bold text-2xl m-auto text-white text-right'}>X</Text>
                    </View>
                </TouchableOpacity>
                <Text className='text-white text-center text-2xl font-bold m-2 mb-0'>Book {time}</Text>
                <Text className='text-white text-center text-2xl mb-2'>{date}</Text>
                <Text className='text-white text-center font-semibold'>$35 Booking fee</Text>
                <Text className='text-white text-center text-xm font-semibold'>(will be subtracted from total)</Text>
                <View className={'h-2'}></View>
                <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 8,
                    }}
                    style={{
                        width: '98%',
                        height: 50,
                        marginVertical: 8,
                        margin: 4
                    }}
                    onCardChange={(cardDetails) => {
                        setCardDetails(cardDetails)
                    }}
                    onFocus={(focusedField) => {

                    }}
                />
                <TouchableOpacity onPress={handlePay} className={'h-14 w-32 rounded-full bg-blue-900 m-auto'}>
                    <Text className={'m-auto font-bold text-2xl text-white'}>Book Now</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default Book