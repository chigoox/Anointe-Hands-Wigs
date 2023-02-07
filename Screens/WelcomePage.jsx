import { SafeAreaView, Text, View, Image, Pressable,  } from 'react-native';
import React, { useState} from 'react'
import Animated,{ ZoomInEasyDown, FadeInUp} from 'react-native-reanimated';


import SignUpScreen from '../Componets/HomeScreen/SignUpScreen'
import LoginScreen from '../Componets/HomeScreen/LoginScreen'


export default function WelcomePage({ navigation }) {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const toggleSignUp = () => {setShowSignUp(!showSignUp)}
  const toggleLogin = () => {setShowLogin(!showLogin)}


  const navigate = (to) =>{ navigation.navigate(to)}


  return (
    <Animated.View entering={ZoomInEasyDown} exiting={FadeInUp} className='relative h-full bg-slate-900 '> 
        <SafeAreaView className={'z-10'}>
          {/* Componets */}
          {showSignUp && <SignUpScreen toggleSignUp={toggleSignUp} navigation={navigate('HomeScreen')}/>}
          {showLogin && <LoginScreen toggleLogin={toggleLogin} navigation={()=>{navigate('HomeScreen')}}/>}
          

          {/* MainPage */}
          <View className={'flex p-4'}>
            <Text className={'text-white font-bold text-8xl'}>Anointed Hands Wigs</Text>
            <Text className="p-2 text-white text-xl">Let us cover you.</Text>
            <View className={'relative top-[95%] h-44'}>
              <View className={'flex-row justify-center mb-4'}>
                <Text className="text-white mt-auto">Don't have an account?</Text>
                <Pressable  onPress={toggleSignUp} className={'h-8 flex justify-end'}>
                  <Text className={'text-center font-bold text-blue-400 '}> Sign up</Text>
                </Pressable>
              </View>
              <Pressable  onPress={toggleLogin} className={'border-2 border-white h-12 w-3/4 m-auto mt-0 rounded-full'}>
                <Text className={'text-center font-bold text-white p-3'}>Enter</Text>
              </Pressable>
            </View>
          </View>
      </SafeAreaView>
      <Image className="absolute z-0 h-full w-full object-cover" source={{uri: "https://cdn.shopify.com/s/files/1/0251/7083/7586/articles/How_to_Get_Thicker_Hair_62aec6ab-9866-4a25-9c53-5154dcd418c7_2048x.jpg?v=1671125120"}}></Image>
    </Animated.View>
    
  )
}

