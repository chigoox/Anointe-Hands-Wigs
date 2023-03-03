import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { handleInput5, addUserInfoToDatabase } from '../../MyCodes/ed5'

export default function Profile({ userData, user, navigation }) {
    const [inputData, setInputData] = useState({
        name: userData?.Name ? userData.Name : '',
        email: userData?.Email ? userData.Email : '',
        address: userData?.userDetails?.address ? userData.userDetails.address : '',
        zip: userData?.userDetails?.zip ? userData.userDetails.zip : '',
    })
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



    const cancel = () => { setInputData() }

    return (
        <KeyboardAvoidingView className={''}>
            <Text className={'text-black font-bold text-2xl text-center mt-14'}>Profile</Text>

            <View number={20} className="h-[40%] w-full  m-auto mt-0 rounded-xl" >
                <TextInput className={'border-sky-400 text-black font-bold p-4 border-4 rounded-full m-2 placeholder:text-black'}
                    onChangeText={(text) => { handleInput5('name', text, setInputData) }}
                    placeholder={'Full name'}
                    autoComplete={'name'}
                    value={inputData?.name ? inputData.name : ''}
                    defaultValue={userData?.Name ? userData.Name : ''}
                    id={'input'}
                />
                <TextInput className={'border-sky-400 text-black font-bold p-4 border-4 rounded-full m-2 placeholder:text-black'}
                    onChangeText={(text) => { handleInput5('email', text, setInputData) }}
                    placeholder={'Email'}
                    autoComplete={'email'}
                    Value={inputData?.email ? inputData.email : ''}
                    defaultValue={userData?.Email ? userData.Email : ''}
                    id={'input'}
                />
                <TextInput className={'border-sky-400 text-black font-bold p-4 border-4 rounded-full m-2 placeholder:text-black'}
                    onChangeText={(text) => handleInput5('address', text, setInputData)}
                    placeholder={'Address: 123 main st apt 4'}
                    inputMode={'text'}
                    Value={inputData?.address ? inputData.address : ''}
                    defaultValue={userData?.userDetails?.address ? userData.userDetails.address : ''}
                    id={'input'}
                />
                <TextInput className={'border-sky-400 font-bold text-black p-4 border-4 rounded-full m-2 placeholder:text-black'}
                    onChangeText={(text) => handleInput5('zip', text, setInputData)}
                    placeholder={'Zip Code'}
                    inputMode={'numeric'}
                    keyboardType={'number-pad'}
                    Value={inputData?.zip ? inputData.zip : ''}
                    defaultValue={userData?.userDetails?.zip ? userData.userDetails.zip : ''}
                    id={'zip input'}
                />

                <View className={'mt-5 mb-24'}>
                    <TouchableOpacity onPress={!inputData ? null : submit} className={'block border-2 border-sky-400 h-16 w-1/2 m-auto rounded-full  my-2'}>
                        <Text className={'text-center font-bold text-sky-300 text-5xl p-3'}>{!inputData ? '' : 'Update'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={!inputData ? null : cancel} className={'block border-2 border-pink-200 h-14 w-1/2 m-auto rounded-full my-2'}>
                        <Text className={'text-center font-bold text-pink-400 text-5xl p-3'}>{!inputData ? '' : 'Clear'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView >
    )
}