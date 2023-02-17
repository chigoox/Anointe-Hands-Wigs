import { ScrollView ,View, Text, SafeAreaView, TextInput, Pressable, KeyboardAvoidingView, Image, Alert } from 'react-native'
import React, { useEffect, useState} from 'react'
import Animated, {FadeInUp,FadeOutRight} from 'react-native-reanimated';
import {handleInput5, addUserInfoToDatabase, getZipInfo, getSignedInUser } from '../../MyCodes/ed5'
import LoginError from '../HomeScreen/LoginError';
import {CardField, Token, useStripe } from '@stripe/stripe-react-native';


function PaymentInfoPage(props) {



  const [userData, setUserData ] = useState()
  const [inputData,setInputData] = useState()
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [zip, setZIP] = useState(0)
  const [token, setToken] = useState()
  const zipcode = inputData?.zip? inputData.zip : userData?.zip? userData.zip: ''
    if (!inputData) setInputData({zip: userData?.zip? userData.zip:''})







    const { createToken } = useStripe();

    const _createToken = async (type) => {
      const { error, token } = await createToken(buildTestTokenParams(type));
  
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        console.log(`Error: ${JSON.stringify(error)}`);
      } else if (token) {
          setToken(token.id)
          /* Alert.alert(
            'Success',
            `The token was created successfully! token: ${token.id}`
          ); */
      }
    };

    function buildTestTokenParams(type) {
      switch (type) {
        case 'Pii':
          return {
            type: 'Pii',
            personalId: '000000000',
          };
        case 'Card':
          return {
            type: 'Card',
            name: userData?.name? userData?.name: inputData?.name? inputData?.name :'',
            currency: 'usd',
          };
        case 'BankAccount':
          return {
            type: 'BankAccount',
            accountNumber: '000123456789',
            routingNumber: '110000000',
            country: 'us',
            currency: 'usd',
          };
        default:
          throw new Error(`Unsupported token type`);
      }
    }


    if (token && !userData?.CartToken){
      addUserInfoToDatabase({CartToken:token},user)

    }



    



  const submit = () => {  
    //handleCardDetails()
    
    if (token){
      setInputData((old) => {
        if ((typeof(zip) == 'object') && (zipcode ) && zip?.places) {
         return ({
           ...old, state: zip?.places[0].state,
             city: zip?.places[0]['place name'],
             stateAB: zip?.places[0]['state abbreviation'],
         })} 
         
        })
        console.log(token)
        setInputData((old)=>{
          return({...old, tokenID: token? token: ''})
        })
        props.navigation.goBack()
       
    }else{

    }
    
  }
    console.log(inputData?.cardDetails)
  const cancel = () => {props.navigation.goBack()}

  function errorCatcher(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    setError([errorCode,errorMessage])  
  }
  function clearError(){
      setError()
  }  


  useEffect(()=>{
    addUserInfoToDatabase({CartToken:''},user)
    if(inputData?.cardDetails?.complete && !token){
      _createToken('Card')
    }
    getZipInfo(zipcode,setZIP)
    getSignedInUser(setUser,setUserData)
    addUserInfoToDatabase({userDetails:inputData},user)
  },[inputData])


  return (
    <Animated.ScrollView entering={FadeInUp} exiting={FadeOutRight} className={'absolute h-screen w-full z-20 bg-white transition-all duration-[20] ease-in-out'}>
       {error && <LoginError error={error} clear={clearError}/>}
       <SafeAreaView className={'my-10 mx-2'}>
            <Text className={'text-white font-bold text-8xl'}>Shipping & Payment</Text>

            <KeyboardAvoidingView  className="h-[40%] w-full  m-auto rounded-xl" >
            <TextInput className={'border-white text-black font-bold p-4 border-4 rounded-full m-2 placeholder:text-white'}
                            onChangeText={(text)=>{ handleInput5('name',text,setInputData)}}
                            placeholder={'Full name'}
                            autoComplete={'name'}
                            defaultValue={userData?.name? userData.name: ''}
                />
                <TextInput className={'border-white text-black font-bold p-4 border-4 rounded-full m-2 placeholder:text-white'}
                            onChangeText={(text)=>{ handleInput5('email',text,setInputData)}}
                            placeholder={'Email'}
                            autoComplete={'email'}
                            defaultValue={userData?.email? userData.email: ''}
                />
                <TextInput className={'border-white text-black p-4 border-4 rounded-full m-2'}
                            onChangeText={(text)=>handleInput5('address',text, setInputData)}
                            placeholder={'Address: 123 main st apt 4'}
                            inputMode={'text'}
                            defaultValue={userData?.address? userData.address: ''}
                />
                <TextInput className={'border-white text-black p-4 border-4 rounded-full m-2'}
                            onChangeText={(text)=>handleInput5('zip',text, setInputData)}
                            placeholder={'Zip Code'}
                            inputMode={'numeric'}
                            keyboardType={'number-pad'}
                            defaultValue={userData?.zip? userData.zip: ''}
                            id={'zip'}
                />

                <View className={'border-4 border-white'}>
                  <View className={'rounded-xl mt-12 w-[80%] mx-auto'}>
                    <Text className={'text-white text-center text-3xl font-bold m-2'}>Payment</Text>
                    <Image className={'rounded-xl h-10 relative object-contain'} source={{uri:'https://basyspro.com/wp-content/uploads/2017/02/Credit-Card-Logos-1024x156.jpg'}}/>

                  </View>

                  <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                      number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                      backgroundColor: '#FFFFFF',
                      textColor: '#000000',
                    }}
                    style={{
                      width: '98%',
                      height: 50,
                      marginVertical: 30,
                      margin: 4
                    }}
                    onCardChange={(cardDetails) => {
                      setToken()
                      setInputData((old) => {return {...old, cardDetails:cardDetails }})
                    }}
                    onFocus={(focusedField) => {
                      console.log('focusField', focusedField);
                    }}
                  />
                </View>
              <View className={'mt-14 mb-24'}>
                <Pressable  onPress={submit} className={'block border-2 border-sky-400 h-16 w-1/2 m-auto rounded-full  my-2'}>
                    <Text className={'text-center font-bold text-white text-5xl p-3'}>Submit</Text>
                </Pressable>
                <Pressable  onPress={cancel} className={'block border-2 border-sky-400 h-14 w-1/2 m-auto rounded-full my-2'}>
                    <Text className={'text-center font-bold text-white text-5xl p-3'}>Cancel</Text>
                </Pressable>    
              </View>
            </KeyboardAvoidingView>
        </SafeAreaView>    
    </Animated.ScrollView >
      
  )
}

export default PaymentInfoPage