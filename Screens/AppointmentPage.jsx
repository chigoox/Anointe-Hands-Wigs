import { SafeAreaView, Text, View, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import Animated, { ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { getSignedInUser, addUserInfoToDatabase, fetchAva, getRand, addAdminInfoToDatabase, fetchAppointments } from '../MyCodes/ed5'
import TimesAva from '../Componets/Appointments/TimesAva';
import { useIsFocused } from '@react-navigation/native'


export default function AppointmentPage() {
  const [signedInUser, setSignedInUser] = useState()
  const [userData, setUserData] = useState()
  const [availability, setAvailability] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDay, setSelectedDay] = useState()
  const [appointment, setAppointment] = useState()
  const [appointmentADMIN, setAppointmentADMIN] = useState()
  const [appointmentData, setAppointmentData] = useState({})
  const [takenApts, setTakenApts] = useState([''])
  const [newTakenApt, setNewTakenApt] = useState()
  const [tapped, setTapped] = useState(false)
  const [markedDates, setMarkedDates] = useState()
  const [oldDate, setOldDate] = useState(selectedDate)
  const toggleTapped = () => { setTapped(!tapped) }
  const isFocused = useIsFocused()


  const _markedDates = () => {
    (Object.keys(appointmentData)).forEach((item) => {
      setMarkedDates((old) => {
        return { ...old, [item]: { selected: true, selectedColor: 'pink' } }
      })

    })

  }


  if (markedDates && String(Object.keys(markedDates)) == 'undefined') _markedDates()




  /* {
  
    [String(Object.keys(appointmentData))]:{selected: true, selectedColor: 'pink' },
    '2023-02-17': {selected: true, marked: true, selectedColor: 'blue'},
    '2012-05-17': {marked: true},
    '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2012-05-19': {disabled: true, disableTouchEvent: true},
    [selectedDate]: {selected: true, selectedColor: 'blue' },
  
  
  
  } */




  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay() + 1;
    if (dayOfWeek == 7) return 'Sunday'
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  function setAppointments(time, timeString) {
    setAppointmentsADMIN(time, timeString)
    setAppointment((old) => {
      return { ...old, Appointment: { time: time, timeString: timeString, date: selectedDate, price: 'free' } }
    })
  }

  function setAppointmentsADMIN(time, timeString) {
    setAppointmentADMIN((old) => {
      return { [selectedDate]: { [timeString]: { time: time, timeString: timeString, name: userData.Name, date: selectedDate, price: 'free', phone: userData.Phone } } }
    })
  }


  const mapTimes = availability?.time[selectedDay] ? Object.values(availability?.time[selectedDay]).map((item) => {
    const apttake = () => {
      let result = false
      if (takenApts) {
        result = false
        takenApts?.forEach((takenApt) => {
          if (takenApt == String(item.match(/[0-9]?[0-9][a|p][m]/))) result = true
        })
      }
      return result
    }

    const notAvaiable = (takenApts != undefined) ? apttake() : false
    if (!notAvaiable) {
      return (
        <TimesAva toggleTapped={toggleTapped} key={getRand(9999999)} time={item} setAppointments={setAppointments} newTakenApt={newTakenApt} setNewTakenApt={setNewTakenApt} />
      )
    }

  }) : ''

  function bookApt() {
    setMarkedDates((old) => {
      return { ...old, [selectedDate]: { selected: true, selectedColor: 'pink' } }
    })
    takenApts ? setTakenApts((old) => { return [...old, newTakenApt] }) : setTakenApts([])
    addAdminInfoToDatabase(appointmentADMIN, 'Appointments', 'Appointments')
    addUserInfoToDatabase(appointment, signedInUser)
    setTimeout(() => {
      _markedDates()
    }, 400);
  }


  useEffect(() => {
    getSignedInUser(setSignedInUser, setUserData)
    fetchAppointments(setAppointmentData)
    fetchAva(setAvailability)
    _markedDates()

    setMarkedDates((old => {

      return {
        ...old,
        [oldDate]: { selected: false, selectedColor: 'blue' }
      }
    }))
    setMarkedDates((old => {

      return {
        ...old,
        [selectedDate]: { selected: true, selectedColor: 'blue' }
      }
    }))

    setOldDate(selectedDate)
  }, [selectedDate, tapped, isFocused])

  useEffect(() => {
    if (appointmentData[selectedDate] != undefined) {
      setTakenApts(Object.keys(appointmentData[selectedDate]))
    } else {
      setTakenApts()
    }
  }, [appointmentData[selectedDate]])


  return (
    <Animated.View className={'flex-1 h-screen w-screen'} entering={ZoomInEasyDown} exiting={ZoomOutEasyDown}>
      <SafeAreaView className={'flex flex-1 h-full'}>
        <Text className={'font-bold text-3xl text-center'}>Appointments</Text>
        <View className={'h-[40%] p-2'}>
          <ScrollView >

            {mapTimes}

          </ScrollView>
        </View>
        <Calendar
          className={'rounded-xl shadow w-[90%] mx-auto'}
          markedDates={markedDates}

          onDayPress={day => {
            setSelectedDate(day.dateString)
            setSelectedDay(getDayOfWeek(day.dateString).toLowerCase())
            setTimeout(() => {
              toggleTapped()
            }, 350);

          }}
        />
        <TouchableOpacity onPress={bookApt} className={'h-14 w-[70%] mx-auto mt-8  bg-blue-700 rounded-xl'}>
          <Text className={'text-2xl font-bold text-center m-auto text-white'}>Book Now</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </Animated.View>
  )
}

