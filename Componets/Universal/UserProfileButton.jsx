import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
//import { userProfilePage } from '../../Screens/0PageHandler'

function UserProfileButton({ navigation }){ 
  const navigate = (to) =>{navigation.navigate(to)}

    function goToUserProfile(){
         
        navigate('userProfilePage')
    }

  return (
    <TouchableOpacity className={'h-10 w-10 rounded-full overflow-hidden'} onPress={goToUserProfile}>
        <Image className={'top-0 right-0 left-0 bottom-0 absolute rounded-3xl z-0 opacity-90'} source={{uri: 'https://s.hdnux.com/photos/52/62/01/11214928/4/1200x0.jpg',}}></Image>
    </TouchableOpacity>
  )
}

export default UserProfileButton