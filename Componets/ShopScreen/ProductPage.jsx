import { SafeAreaView, Text, View, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState} from 'react'
import Animated,{ FadeInUp, FadeOutDown} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { addUserInfoToDatabase, getSignedInUser, deleteUserData, decreaseCartAmount } from '../../MyCodes/ed5';
import { increment } from "firebase/firestore";


function ProductPage ({ navigation, route }) {
    const [signedInUser, setSignedInUser] = useState()
    const [userData, setUserData] = useState()
    const {name, price, img, desc} = route.params
    const [inCart,setInCart] = useState(false)
    const toCart = {Cart:{[name]:{name:name? name:'', price: price? price:'', img:img? img:'', desc:desc? desc: ''}}, CartPrices: price? increment(price):increment(0) }
    const [addedToCart, setAddedToCart] = useState(inCart)
    checkIfItemInCart()
    function checkIfItemInCart(){
        if (userData?.Cart) Object.keys(userData.Cart)
        .forEach((item)=>{
            
            if (item == name){
               if (inCart == false){ 
                setInCart(true)
                setAddedToCart(true)
            } 
                return 
            } 
        })
    }


    function addToCart(){
        addedToCart ? (
            deleteUserData(signedInUser, name),
            decreaseCartAmount(signedInUser, price)
        ) :
        ( addUserInfoToDatabase(toCart , signedInUser))
        setAddedToCart(!addedToCart)
    }  
  
 

  useEffect(()=>{
    getSignedInUser(setSignedInUser, setUserData)
    checkIfItemInCart()
    },[addedToCart])
  
    return (
    <Animated.View nestedScrollEnabled = {true} className={'flex-1 h-screen  w-screen bg-slate-50'} entering={FadeInUp} exiting={FadeOutDown}  contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView className={'flex flex-1 h-full'}>
            {/* Nav bar */}
            <View className={'absolute w-full h-24 z-10 flex flex-row items-end justify-between px-4'}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <View className={'bg-white h-12 w-12 rounded-full p-2'}>
                        <Ionicons name="caret-back-circle-outline" size={32} color={'pink'}></Ionicons>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity className={''}>
                    <View className={'bg-white h-12 w-12 rounded-full'}></View>
                </TouchableOpacity>
            </View>
            {/* Product Img */}
            <View className={'bg-rose-300 h-[65%] w-full bottom-12 rounded-b-[40rem] shadow-lg shadow-slate-600'}>
                <Image className={'h-full rounded-b-[40rem]'} source={{uri:img}}/>
            </View>
            {/* product info */}
            <View className={'flex  h-72 justify-between'}>
                <View className={'px-8 flex flex-row justify-between'}>
                    <Text className={'font-bold text-3xl'}>{name}</Text>
                    <Text className={'font-bold text-3xl'}>${price}.99</Text>
                </View>
                <Text className={'px-8 bottom-12 text-slate-600 font-semibold'}>{desc}</Text>
                
                {/* bottom buttons */}
                <View className={'flex flex-row justify-around w-screen self-end '}>
                    <TouchableOpacity className={'bg-rose-400 h-22 w-[60%] rounded-full p-4'}>
                        <Text className={'font-bold text-5xl m-auto text-white'}>Buy Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addToCart} className={`${addedToCart? 'bg-rose-900':'bg-slate-300'} h-20 w-20 rounded-full p-2 transition-colors`}>
                        <Ionicons name={'cart'} size={64} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
    
        </SafeAreaView>
    </Animated.View> 
  )
}

export default ProductPage