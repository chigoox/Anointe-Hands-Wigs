import { View, Text } from 'react-native'
import React from 'react'

export default function UserTopInfo({ userData }) {
    return (
        <View className={'h-8'}>
            <Text className={'text-slate-600 text-center font-semibold'}>{userData?.Name ? userData?.Name : ''}</Text>
            <Text className={'text-slate-800 text-center text-xm'}>
                {userData?.userDetails.city ? userData?.userDetails.city : ''},{' '}
                {userData?.userDetails.state ? userData?.userDetails.state : ''}
            </Text>
        </View>
    )
}