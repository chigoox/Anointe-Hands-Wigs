import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated';

const Notification = ({ text, color, toggleNotification }) => {
    setTimeout(() => { toggleNotification() }, 2000)
    return (
        <View className={'absolute top-0 left-0 flex z-20  h-32 w-full justify-end'}>
            <Animated.View entering={FadeInUp} exiting={FadeOutUp} className={`${color ? 'bg-rose-500' : 'bg-emerald-500'} p-2 h-12 w-fit mx-auto shadow-sm shadow-black`}>
                <Text className={'text-white m-auto font-bold text-2xl'}>{text}</Text>
            </Animated.View>
        </View>
    )
}

export default Notification