import { View, Text, Image } from 'react-native'
import React from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function CartItem({ img, name, price }) {
  return (
    <View className={'flex flex-row bg-slate-100 w-full h-28 rounded-2xl shadow-black shadow-md my-3'}>
    <View className={'w-[25%] h-full p-1'}>
      <Image className={'h-full scale-90 rounded-3xl'} source={{uri:img}}/>
    </View>
    <View className={' w-[75%] h-full'}>
      <View className={'p-2  w-full h-[50%] flex flex-row justify-between items-end'}>
        <Text className={'text-2xl font-semibold text-end'}>{name}</Text>
        <BouncyCheckbox className={' h-8 w-8'} onPress={(isChecked=true) => {}} isChecked={true}/>
      </View>
      <View className={'p-2  w-full h-[50%] flex flex-row justify-between'}>
        <Text className={'text-4xl font-bold'}>${price}.99</Text>
      </View>
    </View>
  </View>
  )
}