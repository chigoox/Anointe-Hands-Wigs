import { ScrollView, View, Text, SafeAreaView, TextInput, Pressable, KeyboardAvoidingView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInUp, FadeOutRight } from 'react-native-reanimated';
import { handleInput5, addUserInfoToDatabase, getZipInfo, getSignedInUser } from '../../MyCodes/ed5'
import LoginError from '../HomeScreen/LoginError';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function PaymentInfoPage(props) {



  const [userData, setUserData] = useState()
  const [inputData, setInputData] = useState()
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [zip, setZIP] = useState(0)
  const zipcode = inputData?.zip ? inputData.zip : userData?.zip ? userData.zip : ''
  if (!inputData) setInputData({ zip: userData?.zip ? userData.zip : '' })



  const submit = () => {
    //handleCardDetails()
    setInputData((old) => {
      if ((typeof (zip) == 'object') && (zipcode) && zip?.places) {
        return ({
          ...old, state: zip?.places[0].state,
          city: zip?.places[0]['place name'],
          stateAB: zip?.places[0]['state abbreviation'],
        })
      }

    })
    props.navigation.navigate('CheckOutPage')


  }



  const cancel = () => { props.navigation.goBack() }

  function errorCatcher(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError([errorCode, errorMessage])
  }
  function clearError() {
    setError()
  }

  useEffect(() => {
    getSignedInUser(setUser, setUserData)
  }, [])

  useEffect(() => {
    getZipInfo(zipcode, setZIP)
    if (user) addUserInfoToDatabase({ userDetails: inputData }, user)
  }, [inputData])


  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutRight} className={'absolute h-screen w-full z-20 bg-white transition-all duration-[20] ease-in-out'}>
      {error && <LoginError error={error} clear={clearError} />}
      <SafeAreaView className={'my-10 mx-2'}>
        <KeyboardAwareScrollView className="h-[full] w-full  m-auto rounded-xl" >
          <Text className={'text-sky-400 font-bold text-8xl'}>Shipping & Payment</Text>

          <TextInput className={'border-black text-black font-bold p-4 border-2 rounded-full m-2 placeholder:text-slate-600'}
            onChangeText={(text) => { handleInput5('name', text, setInputData) }}
            placeholder={'Full name'}
            autoComplete={'name'}
            defaultValue={userData?.Name ? userData.Name : ''}
          />
          <TextInput className={'border-black text-black font-bold p-4 border-2 rounded-full m-2 placeholder:text-slate-600'}
            onChangeText={(text) => { handleInput5('email', text, setInputData) }}
            placeholder={'Email'}
            autoComplete={'email'}
            defaultValue={userData?.Email ? userData.Email : ''}
          />
          <TextInput className={'border-black text-black p-4 border-2 rounded-full m-2 placeholder:text-slate-600'}
            onChangeText={(text) => handleInput5('address', text, setInputData)}
            placeholder={'Address: 123 main st apt 4'}
            inputMode={'text'}
            defaultValue={userData?.userDetails?.address ? userData?.userDetails?.address : ''}
          />
          <TextInput className={'border-black text-black p-4 border-2 rounded-full m-2 placeholder:text-slate-600'}
            onChangeText={(text) => handleInput5('zip', text, setInputData)}
            placeholder={'Zip Code'}
            inputMode={'numeric'}
            keyboardType={'number-pad'}
            defaultValue={userData?.userDetails?.zip ? userData?.userDetails?.zip : ''}
            id={'zip'}
          />

          <View className={'border-4 border-white'}>



          </View>
          <View className={'mb-24'}>
            <Pressable onPress={submit} className={'block border-2 border-sky-400 h-16 w-1/2 m-auto rounded-full  my-2'}>
              <Text className={'text-center font-bold text-sky-400 text-5xl p-3'}>Submit</Text>
            </Pressable>
            <Pressable onPress={cancel} className={'block border-2 border-sky-400 h-14 w-1/2 m-auto rounded-full my-2'}>
              <Text className={'text-center font-bold text-sky-400 text-5xl p-3'}>Cancel</Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Animated.View >

  )
}

export default PaymentInfoPage