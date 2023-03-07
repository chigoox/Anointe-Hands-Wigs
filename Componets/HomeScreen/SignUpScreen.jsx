import { ScrollView, View, Text, SafeAreaView, TextInput, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeOutUp, FadeInUp, FadeOut, FadeOutRight } from 'react-native-reanimated';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { handleInput5, addUserInfoToDatabase } from '../../MyCodes/ed5'
import LoginError from './LoginError';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignUpScreen(props, { navigation }) {
  const [inputData, SETinputData] = useState({})
  const [error, setError] = useState()

  const submit = () => { createUser(inputData.email, inputData.password, inputData.passwordMatch) }

  function errorCatcher(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError([errorCode, errorMessage])
  }
  function clearError() {
    setError()
  }

  function sendVerificationEmail() {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
      });
  }


  //firebase Create User
  function createUser(email, password, passwordMatch) {
    console.log(passwordMatch)
    const auth = getAuth();
    if (password == passwordMatch && password?.match(/[!@#$%&*?]/) != null && password?.match(/[a-z]+/) != null && password?.match(/[A-Z1-9]/) != null && password?.length > 6) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          addUserInfoToDatabase(inputData, user)
          sendVerificationEmail()
          props.toggleSignUp()

        })
        .catch((error) => {
          errorCatcher(error)
        });
    } else {
      setError(['Password issue: ', 'Password must be 6 characters long, contain capital letter, and a special chacter.'])
    }
  }




  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutRight} className={'absolute h-screen w-full z-20 bg-sky-300 transition-all duration-[20] ease-in-out'}>
      <KeyboardAwareScrollView >
        {error && <LoginError error={error} clear={clearError} />}
        <SafeAreaView className={'my-14 mx-2'}>
          <Text className={'text-white font-bold text-8xl'}>Anointed Hands Wigs</Text>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="h-[40%] w-full top-10 m-auto rounded-xl" >
            <TextInput className={'border-white text-white p-4 border-2  m-2 placeholder:text-white'}
              onChangeText={(text) => { handleInput5('Name', text, SETinputData) }}
              placeholder={'Full name'}
              name={'Name'}
              autoComplete={'name'}
            />
            <TextInput className={'border-white text-white p-4 border-2  m-2'}
              onChangeText={(text) => handleInput5('Email', text, SETinputData)}
              placeholder={'Email'}
              inputMode={'email'}
              autoComplete={'email'}
            />
            <TextInput className={'border-white text-white p-4 border-2  m-2'}
              onChangeText={(text) => handleInput5('Password', text, SETinputData)}
              placeholder={'Password'}
              inputMode={'text'}
              secureTextEntry={'true'}
            />
            <TextInput className={'border-white text-white p-4 border-2  m-2'}
              onChangeText={(text) => handleInput5('PasswordMatch', text, SETinputData)}
              placeholder={'Confirm Password'}
              secureTextEntry={'true'}
              inputMode={'text'}
            />
            <Pressable onPress={submit} className={'block border-2 border-sky-400 h-16 w-1/2 m-auto  mt-20'}>
              <Text className={'text-center font-bold text-white text-5xl p-3'}>Sign up</Text>
            </Pressable>
            <Pressable onPress={props.toggleSignUp} className={'border-2 border-sky-400 h-10 w-36 m-auto  top-32 mt-2'}>
              <Text className={'text-center font-bold text-white text-2xl p-1'}>Back</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Animated.View >

  )
}