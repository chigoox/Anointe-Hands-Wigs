import { SafeAreaView, Text, View, Image, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState} from 'react'
import Animated,{ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown} from 'react-native-reanimated';
import CartItem from '../Componets/CartScreen/CartItem';
import mocCart from '../BackenData/Carts';
import { CARTTOTAL } from '../BackenData/Carts';

export default function CartPage() {
  let [CARTTOTALg,setCARTTOTAL] = useState(0);
  const cartMap = mocCart.cartItems.map(({name, price, img}) =>{

    return(
      <CartItem img={img} name={name} price={price} key={`${name} ${price}`}/>
    )
  })


  useEffect(()=>{
    setCARTTOTAL(CARTTOTAL)
  },[CARTTOTAL])
  

  return (
    <Animated.View className={'flex-1 h-screen w-screen'} entering={ZoomInEasyDown} exiting={ZoomOutEasyDown}>
      <SafeAreaView className={'flex flex-1 h-full '}>
       {/*TOP BAR */}
       <View className={'flex flex-row justify-between mx-2'}>
        <Pressable className={'bg-black h-10 w-10 rounded-full'}></Pressable>
        <View>
          <Text className={'text-slate-800 text-center font-bold text-lg'}>Cart</Text>
        </View>
        <View className={'h-10 w-10 rounded-full overflow-hidden'}>
          <Image className={'top-0 right-0 left-0 bottom-0 absolute rounded-3xl z-0 opacity-90'} source={{uri: 'https://s.hdnux.com/photos/52/62/01/11214928/4/1200x0.jpg',}}></Image>
        </View>
       </View>

        {/* Cart Items */}
       <ScrollView className={'p-6 shadow-black shadow-md'}>
       {cartMap}
       </ScrollView>

      </SafeAreaView>
      {/* CheckOut */}
      <View className={'bottom-4 flex flex-row justify-between p-4'}>
        <View className={'h-44 p-2'}>
          <Text className={'text-3xl font-semibold text-slate-600'}>Total</Text>
          <Text className={'text-4xl font-bold '}>${CARTTOTAL}.99</Text>
        </View >
        <View className={'w-[55%] h-24 rounded-full p-2 bg-rose-300'}>
          <Text className={'text-4xl font-bold m-auto text-white'}>Pay Now</Text>
        </View> 
      </View>


    </Animated.View>
  )
}

//mocCart.cartItems