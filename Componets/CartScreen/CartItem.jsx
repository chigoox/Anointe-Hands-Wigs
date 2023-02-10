import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function CartItem({ img, name, price, deleteCartItem, reRender, setReRender}) {
  const [deleted , setDeleted] = useState(false)
  return (
    <View className={` ${deleted? 'absolute right-[900%] scale-0 h-0 w-0': 'w-full h-28'} no flex flex-row bg-slate-100  rounded-2xl shadow-black shadow-md my-3 duration-1000 transition-all`}>
    <View className={'w-[25%] h-full p-1'}>
      <Image className={'h-full scale-90 rounded-3xl'} source={{uri:img}}/>
    </View>
    <View className={' w-[75%] h-full'}>
      <View className={'p-2  w-full h-[50%] flex flex-row justify-between items-end'}>
        <Text className={'text-2xl font-semibold text-end'}>{name}</Text>
        <BouncyCheckbox  className={' h-8 w-8'} onPress={(isChecked=true) => {isChecked? setDeleted(false): setDeleted(true);deleteCartItem(name);setReRender(!reRender)}} isChecked={true}/>
      </View>
      <View className={'p-2  w-full h-[50%] flex flex-row justify-between'}>
        <Text className={'text-4xl font-bold'}>${price}.99</Text>
      </View>
    </View>
  </View>
  )
}