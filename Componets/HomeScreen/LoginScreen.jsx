import { Keyboard, ScrollView, View, Text, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { handleInput5 } from '../../MyCodes/ed5'
import Animated, { ZoomInEasyDown, ZoomOutEasyDown } from 'react-native-reanimated';
import LoginError from './LoginError';
import Notification from '../Universal/Notification';


export default function LoginScreen(props) {
  const [inputData, SETinputData] = useState({})
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [error, setError] = useState()
  const [notificationEmailSent, setNotificationEmailSent] = useState(false)
  const toggleNotifiEmailSent = () => { setNotificationEmailSent(!notificationEmailSent) }
  const [notificationEmailNotSent, setNotificationEmailNotSent] = useState(false)
  const toggleNotifiEmailNotSent = () => { setNotificationEmailNotSent(!notificationEmailNotSent) }



  function errorCatcher(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError([errorCode, errorMessage])
  }
  function clearError() {
    setError()
  }


  function login(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        props.navigation()
        // ...
      })
      .catch((error) => {
        errorCatcher(error, setError)
      });
  }




  function resetPassword(email) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toggleNotifiEmailSent()
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        toggleNotifiEmailNotSent()

        // ..
      });
  }




  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShown(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShown(false);
    });

    return () => {
      //showKeyboard.removeListener('keyboardDidShow');
      //hideKeyboard.removeListener('keyboardDidHide');
    };
  }, []);

  return (
    <TouchableOpacity onPress={isKeyboardShown ? null : props.toggleLogin} className={'absolute h-screen w-full z-40  transition-all duration-[20] ease-in-out'}>
      {error && <LoginError error={error} clear={clearError} />}
      {notificationEmailSent && <Notification text={'Email Sent'} color={false} toggleNotification={toggleNotifiEmailSent} />}
      {notificationEmailNotSent && <Notification text={`Enter a valid email`} color={true} toggleNotification={toggleNotifiEmailNotSent} />}
      <ScrollView className={' w-fit h-fit  flex m-auto bottom-[20%]'}>
        <View className="flex justfiy-start items-center w-full h-screen z-40">
          <Animated.View entering={ZoomInEasyDown} exiting={ZoomOutEasyDown} className="border-2 border-black bg-slate-900   h-96 w-72 m-auto top-40 rounded-full p-4">
            <KeyboardAvoidingView>
              <Text className={'text-white font-bold text-2xl text-center overflow-hidden p-8'}>Welcome back</Text>
              <TextInput className={'border-white text-2xl text-white p-4 border-4 rounded-full mb-2'}
                onChangeText={(text) => { handleInput5('email', text, SETinputData) }}
                placeholder={'Email'}
                autoComplete={'email'}
                placeholderTextColor={"white"}
              />
              <TextInput className={'border-white text-2xl text-white p-4 border-4 rounded-full m-2'}
                onChangeText={(text) => { handleInput5('password', text, SETinputData) }}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderTextColor={"white"}
              />
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={() => { login(inputData.email, inputData.password) }} className={'block border-2 border-sky-400 h-16 w-1/2 m-auto rounded-full mt-12'}>
              <Text className={'text-center font-bold text-white text-4xl p-3'}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { resetPassword(inputData.email) }} className={'h-12 w-28 bg-slate-300 m-auto my-14 rounded-3xl'}>
              <Text className={'text-white m-auto'}>Forgot password?</Text>
            </TouchableOpacity>
          </Animated.View >

        </View>

      </ScrollView>
    </TouchableOpacity >
  )
}


