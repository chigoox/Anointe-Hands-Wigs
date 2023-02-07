import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { FadeOutUp, FadeInUp } from 'react-native-reanimated'
//import { AiFillCloseCircle } from "react-icons/ai";

export default function LoginError(props) {

  return (
    
    <Animated.ScrollView entering={FadeInUp} exiting={FadeOutUp} className={'absolute h-screen w-full z-20 transition-all duration-[20] ease-in-out'}>
      <View className="absolute z-40 w-full">
 
      <View className='top-[80%] relative h-[35vh]'>
        <View className='relative shadow-md rounded-md bg-stone-700 h-full w-[80%] p-2 m-auto'>
            <Text className='font-bold text-5xl text-center text-white'>Error</Text>
            <Text className='mt-10 font-semibold text-xl text-center text-white' >{props.error}</Text>
            <Pressable className={' h-12 w-1/2 border-2 border-white rounded-full m-auto'} onPress={props.clear}>
              <Text className={'text-white  text-4xl font-bold text-center m-auto'}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  )
}
