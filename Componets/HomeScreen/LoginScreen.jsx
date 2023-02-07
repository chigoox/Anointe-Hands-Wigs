import { Keyboard, ScrollView ,View, Text, SafeAreaView, TextInput, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect} from 'react'
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import {handleInput5} from '../../MyCodes/ed5'
import Animated,{ZoomInEasyDown, ZoomOutEasyDown} from 'react-native-reanimated';
import LoginError from './LoginError';

export default function LoginScreen(props) {
  const [inputData,SETinputData] = useState({})
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [error, setError] = useState()

  function errorCatcher(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    setError([errorCode,errorMessage])  
  }
  function clearError(){
      setError()
  }


  function login(email,password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        props.navigation()
        // ...
      })
      .catch((error) => {
        errorCatcher(error,setError)
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
    <Pressable onPress={isKeyboardShown? null:props.toggleLogin} className={'absolute h-screen w-full z-20  transition-all duration-[20] ease-in-out'}>
      {error && <LoginError error={error} clear={clearError}/>}
    <ScrollView className={'my-14 mx-2 '}>
      <Animated.View entering={ZoomInEasyDown} exiting={ZoomOutEasyDown} className="border-2 border-black bg-slate-900 h-96 w-96 m-auto top-40 rounded-full p-4">
        <KeyboardAvoidingView>
        <Text className={'text-white font-bold text-4xl text-center overflow-hidden p-8'}>Welcome back</Text>
        <TextInput className={'border-white text-white p-4 border-4 rounded-full m-2 placeholder:text-white'}
                            onChangeText={(text)=>{ handleInput5('email',text,SETinputData)}}
                            placeholder={'Email'}
                />
        <TextInput className={'border-white text-white p-4 border-4 rounded-full m-2 placeholder:text-white'}
                            onChangeText={(text)=>{ handleInput5('password',text,SETinputData)}}
                            placeholder={'Password'}
                />
        </KeyboardAvoidingView>
      </Animated.View>
      <Pressable  onPress={()=>{login(inputData.email,inputData.password)}} className={'block border-2 border-sky-400 h-16 w-1/2 m-auto rounded-full mt-12'}>
                <Text className={'text-center font-bold text-white text-5xl p-3'}>Login</Text>
            </Pressable>

     </ScrollView>    
 </Pressable >
  )
}



