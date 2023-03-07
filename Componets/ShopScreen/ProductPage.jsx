import { SafeAreaView, Text, View, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import Animated, { FadeInUp, FadeOutDown, FadeOutUp, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { addUserInfoToDatabase, getSignedInUser, deleteUserData, decreaseCartAmount } from '../../MyCodes/ed5';
import { increment } from "firebase/firestore";
import UserProfileButton from '../Universal/UserProfileButton';
import Notification from '../Universal/Notification';

function ProductPage({ navigation, route }) {
    const [signedInUser, setSignedInUser] = useState()
    const [userData, setUserData] = useState()
    const { name, price, img, desc } = route.params
    const [inCart, setInCart] = useState(false)
    const toCart = { Cart: { [name]: { name: name ? name : '', price: price ? price : '', img: img ? img : 'img', desc: desc ? desc : '' } }, CartTotal: price ? increment(price) : increment(0) }
    const [addedToCart, setAddedToCart] = useState(inCart)
    const navigate = (to, params) => { navigation.navigate(to, params) }
    const toCheckOutBuyNow = (name, price, img, desc) => { navigate('CheckOutPage', { name: name ? name : '', price: price ? price : '', img: img ? img : 'img', desc: desc ? desc : '' }) }
    const [notificationAddToCart, setNotficationAddToCart] = useState(false)
    const [notificationRemoveCart, setNotficationRemoveCart] = useState(false)
    const toggleNotifiRemove = () => { setNotficationRemoveCart(!notificationRemoveCart) }
    const toggleNotifiAdd = () => { setNotficationAddToCart(!notificationAddToCart) }

    const [noCart, setNoCart] = useState(false);
    const toggleNoCart = () => { setNoCart(!noCart) }
    if (noCart) setTimeout(() => { toggleNoCart() }, 1000)

    checkIfItemInCart()
    function checkIfItemInCart() {
        if (userData?.Cart) Object.keys(userData.Cart)
            .forEach((item) => {

                if (item == name) {
                    if (inCart == false) {
                        setInCart(true)
                        setAddedToCart(true)
                    }
                    return
                }
            })
    }


    function addToCart() {
        if (addedToCart) {
            toggleNotifiRemove()
            deleteUserData(signedInUser, name)
            decreaseCartAmount(signedInUser, price)
        } else {
            toggleNotifiAdd()
            addUserInfoToDatabase(toCart, signedInUser)
        }

        setAddedToCart(!addedToCart)

    }



    useEffect(() => {
        getSignedInUser(setSignedInUser, setUserData)
        checkIfItemInCart()
    }, [addedToCart])

    return (
        <Animated.View nestedScrollEnabled={true} className={'flex-1 h-screen  w-screen bg-slate-50'} entering={FadeInUp} exiting={FadeOutDown} contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView className={'flex flex-1 h-full'}>
                {notificationAddToCart && <Notification text={'Added to cart'} color={false} toggleNotification={toggleNotifiAdd} />}
                {notificationRemoveCart && <Notification text={'Removed from cart'} color={true} toggleNotification={toggleNotifiRemove} />}
                {/* Nav bar */}
                <View className={'absolute  w-full h-24 z-10 flex flex-row items-end justify-between px-4'}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View className={'bg-slate-200 h-10 w-10 rounded-xl justify-center items-center flex'}>
                            <Ionicons name="caret-back-circle-outline" size={32} color={'black'}></Ionicons>
                        </View>
                    </TouchableOpacity>

                    <View className={'rounded-xl bg-slate-200 bg-opacity-75 flex justify-center'}>
                        <UserProfileButton navigation={navigation} />
                    </View>
                </View>
                {/* Product Img */}
                <View className={'bg-rose-300 h-[65%] w-full bottom-12 rounded-b-[40rem] shadow-lg shadow-slate-600'}>
                    <Image className={'h-full rounded-b-[40rem]'} source={{ uri: img ? img : '' }} />
                </View>
                {/* product info */}
                <View className={'flex  h-72 justify-between'}>
                    <View className={'px-8 flex flex-row justify-between'}>
                        <Text className={'font-bold text-3xl'}>{name}</Text>
                        <Text className={'font-bold text-3xl'}>${price}</Text>
                    </View>
                    <Text className={'px-8 bottom-12 text-slate-600 font-semibold'}>{desc}</Text>

                    {/* bottom buttons */}
                    <View className={'flex flex-row justify-around w-screen self-end '}>
                        <TouchableOpacity

                            className={'bg-rose-400 h-22 w-[60%] rounded-full p-4'}
                            onPress={() => { addedToCart ? toggleNoCart() : toCheckOutBuyNow(name, price, img, desc) }}
                        >
                            {noCart && <Animated.Text entering={SlideInRight} exiting={SlideOutLeft} className={'absolute -top-8 font-semibold text-rose-900 text-xl'}>Item already in Cart</Animated.Text>}

                            <Text className={'font-bold text-5xl m-auto text-white'}>Buy Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={addToCart}
                            className={`${addedToCart ? 'bg-rose-900' : 'bg-slate-300'} h-20 w-20 rounded-full p-2 transition-colors`}
                        >
                            <Ionicons name={'cart'} size={64} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        </Animated.View>
    )
}

export default ProductPage