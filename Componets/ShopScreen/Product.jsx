import { View, Text, Image } from 'react-native'
import React from 'react'

function Product({ uri, name, price }) {
  return (
    <View className={'bg-slate-400 h-72 w-44 rounded-3xl'}>
              <Image className={'h-full w-full rounded-3xl'} source={{uri: uri}}></Image>  
              
              <View className={' h-full w-full'}>
               <Text className={'text-2xl font-bold text-slate-900 text-center'}>{name}</Text>
               <Text className={'font-semibold text-slate-900 text-center'}>${price}</Text>          
              </View>

          </View>

  )
}

export default Product