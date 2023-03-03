import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { decreaseCartAmount } from '../../MyCodes/ed5'


export default function CartItem({ img, name, price, desc, deleteCartItem, signedInUser, setCARTTOTAL, toItemPage, cartTotal }) {
  const [deleted, setDeleted] = useState(false)
  const addRemoveCartItem = (isChecked) => {
    if (isChecked) {
      setDeleted(false)
    } else {
      deleteCartItem(name)
      decreaseCartAmount(signedInUser, price, cartTotal)
      setCARTTOTAL((old) => { old - price })
      setDeleted(true)


    }
  }


  return (
    <TouchableOpacity onPress={() => { console.log(name, price, desc); toItemPage(name, price, img, desc) }} className={` ${deleted ? 'absolute right-[900%] scale-0 h-0 w-0' : 'w-full h-28'} no flex flex-row bg-slate-100  rounded-2xl shadow-black shadow-md my-3 duration-1000 transition-all`}>
      <View className={'w-[25%] h-full p-1'}>
        <Image className={'h-full scale-90 rounded-3xl'} source={{ uri: img }} />
      </View>
      <View className={' w-[75%] h-full'}>
        <View className={'p-2  w-full h-[50%] flex flex-row justify-between items-end'}>
          <Text className={'text-2xl font-semibold text-end'}>{name}</Text>
          <BouncyCheckbox className={' h-8 w-8'} onPress={(isChecked = true) => { addRemoveCartItem(isChecked) }} isChecked={true} />
        </View>
        <View className={'p-2  w-full h-[50%] flex flex-row justify-between'}>
          <Text className={'text-4xl font-bold'}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}