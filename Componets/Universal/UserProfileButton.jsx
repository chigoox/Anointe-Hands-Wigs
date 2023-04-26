import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
//import { userProfilePage } from '../../Screens/0PageHandler'

function UserProfileButton({ navigation }) {
  const navigate = (to) => { navigation.navigate(to) }

  function goToUserProfile() {
    navigate('userProfilePage')
  }

  return (
    <TouchableOpacity className={'h-10 w-10'} onPress={goToUserProfile}>
      <Image className={'top-0 right-0 left-0 scale-75 bottom-0 absolute z-0 opacity-90'} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/56/56763.png', }}></Image>
    </TouchableOpacity>
  )
}
//
export default UserProfileButton