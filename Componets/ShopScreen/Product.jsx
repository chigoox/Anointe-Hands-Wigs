import { View, Text, Image, Animated } from 'react-native'
import React from 'react'
import { FadeIn, ZoomInEasyDown } from 'react-native-reanimated'

function Product({ img, name, price }) {
  return (
    <Animated.View enter={ZoomInEasyDown} className={'bg-slate-400 h-72 w-44 rounded-3xl'}>
      <Image className={'h-full w-full rounded-3xl'} source={{ uri: img }}></Image>

      <View className={' h-full w-full'}>
        <Text className={'text-2xl font-bold text-slate-900 text-center'}>{name}</Text>
        <Text className={'font-semibold text-slate-900 text-center'}>${price}</Text>
      </View>

    </Animated.View>

  )
}

export default Product