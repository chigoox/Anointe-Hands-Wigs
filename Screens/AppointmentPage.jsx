import { SafeAreaView, Text, View, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState} from 'react'
import Animated,{ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown} from 'react-native-reanimated';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { getSignedInUser, deleteUserData,fetchAva } from '../MyCodes/ed5'
    


export default function AppointmentPage(){
    const [signedInUser, setSignedInUser] = useState()
    const [userData, setUserData] = useState()
    const [availability, setAvailability] = useState()
    const [selectedDate, setSelectedDate] =  useState()

    function getDayOfWeek(date) {
      const dayOfWeek = new Date(date).getDay() + 1;   
      console.log(dayOfWeek)
      if (dayOfWeek == 7) return 'Sunday'
      return isNaN(dayOfWeek) ? null : 
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }


    console.log(getDayOfWeek(selectedDate))
if(availability?.time?.monday)console.log(Object.values(availability.time.monday))

    useEffect(()=>{
      getSignedInUser(setSignedInUser, setUserData)
      fetchAva(setAvailability)
    },[])
  
  return(
    <Animated.View className={'flex-1 h-screen w-screen'} entering={ZoomInEasyDown} exiting={ZoomOutEasyDown}>
      <SafeAreaView className={'flex flex-1 h-full'}>
      <Text className={'font-bold text-3xl text-center'}>Appointments</Text>
      <View className={'h-[40%] p-2'}>
        <ScrollView >
          <View className={'bg-slate-100 shadow-sm shadow-slate-400  h-16 w-3/4 mx-auto my-4 rounded-2xl'}>
            <Text className={'text-center text-2xl font-bold m-auto'}>1:00 PM</Text>
          </View>
          <View className={'bg-slate-100 shadow-sm shadow-slate-400  h-16 w-3/4 mx-auto my-4 rounded-2xl'}>
            <Text className={'text-center text-2xl font-bold m-auto'}>2:00 PM</Text>
          </View>
          <View className={'bg-slate-100 shadow-sm shadow-slate-400  h-16 w-3/4 mx-auto my-4 rounded-2xl'}>
            <Text className={'text-center text-2xl font-bold m-auto'}>3:00 PM</Text>
          </View>
          <View className={'bg-slate-100 shadow-sm shadow-slate-400  h-16 w-3/4 mx-auto my-4 rounded-2xl'}>
            <Text className={'text-center text-2xl font-bold m-auto'}>4:00 PM</Text>
          </View>
          <View className={'bg-slate-100 shadow-sm shadow-slate-400  h-16 w-3/4 mx-auto my-4 rounded-2xl'}>
            <Text className={'text-center text-2xl font-bold m-auto'}>5:00 PM</Text>
          </View>
          <View className={'bg-slate-100 shadow-sm shadow-slate-400  h-16 w-3/4 mx-auto my-4 rounded-2xl'}>
            <Text className={'text-center text-2xl font-bold m-auto'}>6:00 PM</Text>
          </View>
        </ScrollView>
      </View>
      <Calendar
      className={'rounded-xl shadow w-[90%] mx-auto'}
        markedDates={{
          '2023-02-17': {selected: true, marked: true, selectedColor: 'blue'},
          '2012-05-17': {marked: true},
          '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
          '2012-05-19': {disabled: true, disableTouchEvent: true}
        }}

        onDayPress={day => {
          setSelectedDate(day.dateString)
        
          
        }}
      />
      <Pressable className={'h-14 w-[70%] mx-auto mt-8  bg-blue-700 rounded-xl'}>
        <Text className={'text-2xl font-bold text-center m-auto text-white'}>Book Now</Text>
      </Pressable>
        
      </SafeAreaView>
    </Animated.View>
  )
}

