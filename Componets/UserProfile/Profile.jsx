import { View, Text, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { handleInput5, addUserInfoToDatabase } from '../../MyCodes/ed5'

export default function Profile({ userData, user }) {
    const [inputData, setInputData] = useState()
    const submit = () => {

        const data = {
            Name: inputData.name,
            Email: inputData.email,
            userDetails: {
                address: inputData.address,
                zip: inputData.zip,
            }

        }
        addUserInfoToDatabase(data, user)



    }


    console.log(inputData)
    const cancel = () => { }

    return (
        <View className={''}>
            <Text className={'text-black font-bold text-2xl text-center mt-10'}>Profile</Text>

            <KeyboardAvoidingView className="h-[40%] w-full  m-auto mt-0 rounded-xl" >
                <TextInput className={'border-sky-400 text-black font-bold p-4 border-4 rounded-full m-2 placeholder:text-black'}
                    onChangeText={(text) => { handleInput5('name', text, setInputData) }}
                    placeholder={'Full name'}
                    autoComplete={'name'}
                    defaultValue={userData?.Name ? userData.Name : ''}
                />
                <TextInput className={'border-sky-400 text-black font-bold p-4 border-4 rounded-full m-2 placeholder:text-black'}
                    onChangeText={(text) => { handleInput5('email', text, setInputData) }}
                    placeholder={'Email'}
                    autoComplete={'email'}
                    defaultValue={userData?.Email ? userData.Email : ''}
                />
                <TextInput className={'border-sky-400 text-black font-bold p-4 border-4 rounded-full m-2 placeholder:text-black'}
                    onChangeText={(text) => handleInput5('address', text, setInputData)}
                    placeholder={'Address: 123 main st apt 4'}
                    inputMode={'text'}
                    defaultValue={userData?.userDetails?.address ? userData.userDetails.address : ''}
                />
                <TextInput className={'border-sky-400 font-bold text-black p-4 border-4 rounded-full m-2 placeholder:text-black'}
                    onChangeText={(text) => handleInput5('zip', text, setInputData)}
                    placeholder={'Zip Code'}
                    inputMode={'numeric'}
                    keyboardType={'number-pad'}
                    defaultValue={userData?.userDetails?.zip ? userData.userDetails.zip : ''}
                    id={'zip'}
                />

                <View className={'mt-5 mb-24'}>
                    <Pressable onPress={submit} className={'block border-2 border-sky-400 h-16 w-1/2 m-auto rounded-full  my-2'}>
                        <Text className={'text-center font-bold text-sky-300 text-5xl p-3'}>Edit</Text>
                    </Pressable>
                    <Pressable onPress={cancel} className={'block border-2 border-pink-200 h-14 w-1/2 m-auto rounded-full my-2'}>
                        <Text className={'text-center font-bold text-pink-400 text-5xl p-3'}>Clear</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}