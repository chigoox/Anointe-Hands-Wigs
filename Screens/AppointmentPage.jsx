import { SafeAreaView, Text, View, ActivityIndicator, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import Animated, { ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown, FadeInDown, SlideInUp } from 'react-native-reanimated';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { getSignedInUser, addUserInfoToDatabase, fetchAva, getRand, addAdminInfoToDatabase, fetchAppointments } from '../MyCodes/ed5'
import TimesAva from '../Componets/Appointments/TimesAva';
import { useIsFocused } from '@react-navigation/native'
import LogoutButton from '../Componets/Universal/LogoutButton';
import UserProfileButton from '../Componets/Universal/UserProfileButton';
import { STRIPE_API_KEY } from '@env'
import { StripeProvider, useStripe, useConfirmPayment, ConfirmSetupIntentError, CardField } from '@stripe/stripe-react-native';
import Book from '../Componets/Appointments/Book';


export default function AppointmentPage({ navigation }) {
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
  const [selected, setselected] = useState()
  const toggleTapped = () => { setTapped(!tapped); setselected() }
  const isFocused = useIsFocused()
  const [booking, setBooking] = useState(false)
  const toggleBooking = (booked) => { setBooking(!booking); if (booked == true) bookApt() }

  const _markedDates = () => {
    (Object.keys(appointmentData)).forEach((item) => {
      setMarkedDates((old) => {
        return { ...old, [item]: { selected: true, selectedColor: 'pink' } }
      })

    })

  }

  if (markedDates && String(Object.keys(markedDates)) == 'undefined') _markedDates()

  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay() + 1;
    if (dayOfWeek == 7) return 'Sunday'
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  function setAppointments(time, timeString) {
    console.log("working")
    setAppointmentsADMIN(time, timeString)
    setAppointment((old) => {
      return { ...old, Appointment: { time: time, timeString: timeString, date: selectedDate, price: 'free' } }
    })
  }

  function setAppointmentsADMIN(time, timeString) {
    setAppointmentADMIN((old) => {
      return {
        [selectedDate]: {
          [timeString]: {
            time: time,
            timeString: timeString,
            name: userData.Name,
            date: selectedDate,
            price: 'free',
            phone: userData.Phone
          }
        }
      }
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
        <TimesAva
          toggleTapped={toggleTapped}
          key={getRand(9999999)} time={item}
          setAppointments={setAppointments}
          newTakenApt={newTakenApt}
          setNewTakenApt={setNewTakenApt}
          setselected={setselected}
          selected={selected} />

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

    _markedDates()
    fetchAppointments(setAppointmentData)
    fetchAva(setAvailability)
    setOldDate(selectedDate)
  }, [selectedDate, tapped, isFocused])

  useEffect(() => {
    getSignedInUser(setSignedInUser, setUserData)
    if (appointmentData[selectedDate] != undefined) {
      setTakenApts(Object.keys(appointmentData[selectedDate]))
    } else {
      setTakenApts()
    }
  }, [appointmentData[selectedDate]])


  return (
    <Animated.View className={'flex-1 h-screen w-screen'} entering={FadeInUp} exiting={ZoomOutEasyDown}>
      {!appointmentData && <View className="z-40 absolute h-screen bottom-0 top-0 flex w-full">
        <ActivityIndicator size="large" className={'m-auto text-red-900'} color={'pink'} />
      </View>}
      <SafeAreaView className={'flex flex-1 h-full'}>

        <StripeProvider
          publishableKey={STRIPE_API_KEY}
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.{{AHW}}" // required for Apple Pay
        >
          {booking && <Book date={selectedDate} time={newTakenApt} userData={userData} toggleBooking={toggleBooking} bookApt={bookApt} />}
        </StripeProvider>

        <View className={'flex flex-row justify-between px-2'}>
          <LogoutButton navigation={navigation} />
          <Text className={'font-bold text-3xl text-center'}>Appointments</Text>
          <UserProfileButton navigation={navigation} />
        </View>

        <View className={'h-72 p-2 z-0  relative'}>
          <View className={'flex flex-row flex-wrap'}>

            {mapTimes}

          </View>
          <Text className={'absolute bottom-0 text-center w-full'}>$35 booking fee</Text>
        </View>
        <Calendar
          className={'rounded-xl shadow w-[90%] mx-auto'}
          markedDates={markedDates}
          disableMonthChange={true}
          hideArrows={true}
          initialDate={new Date().toJSON().slice(0, 10).replace(/-/g, '/')}
          onDayPress={day => {
            setSelectedDate(day.dateString)
            setSelectedDay(getDayOfWeek(day.dateString).toLowerCase())
            setTimeout(() => {
              toggleTapped()
            }, 350);

          }}
        />
        <TouchableOpacity disabled={!selected} onPress={toggleBooking} className={'h-14 w-[70%] mx-auto mt-8  bg-blue-700 rounded-xl'}>
          <Text className={'text-2xl font-bold text-center m-auto text-white'}>Book Now</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </Animated.View>
  )
}

