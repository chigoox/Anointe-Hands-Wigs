import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';


export default function LogoutButton({ navigation }) {






    const [loggingOut, setLoggingOut] = useState()

    logOut = () => { setLoggingOut(true) }
    if (loggingOut) setTimeout(() => { setLoggingOut(false) }, 5000)
    const loggedOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.navigate('WelcomePage')




        }).catch((error) => {
            Alert.alert(error)
        });
    }
    return (
        <View className="relative">
            {loggingOut && <Animated.View entering={FadeInLeft} exiting={FadeOutLeft} className={'z-10 h-14 w-20 -top-3 flex absolute flex-row'}>
                <TouchableOpacity onPress={loggedOut} className={' h-full bg-emerald-300 m-1 rounded-full flex p-2 flex-row items-center justify-center'}>
                    <Text className="font-bold">LogOut</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setLoggingOut(false) }} className={'h-full bg-rose-300 m-1 rounded-full flex p-2 flex-row items-center justify-center'}>
                    <Text className="font-bold">Cancel</Text>
                </TouchableOpacity>

            </Animated.View>}
            <TouchableOpacity onPress={logOut} className={'w-10 h-10  flex justify-center'}>

                <Image className={'h-fit w-fit scale-[.09]  relative -left-[325px]  border-2 border-black'} source={require('../../assets/AHWLOGO.png')}></Image>
            </TouchableOpacity>
        </View >


    )
}
