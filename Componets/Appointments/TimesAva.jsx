import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const TimesAva = ({time, setAppointments, setNewTakenApt, toggleTapped}) => {
    const timeNumber = Number(time.substr(2,4).match(/[0-9]?[0-9]/))
    const timeString = String(time.substr(2,4).match(/[0-9]?[0-9][a|p][m]/))

    function Tapped(){
        toggleTapped()
        setNewTakenApt(timeString)
        setAppointments(timeNumber,timeString)
    }
    
  return (
    <TouchableOpacity onPress={Tapped} className={`${false ? 'hidden':''}bg-slate-100 shadow-sm shadow-slate-400  h-16 w-3/4 mx-auto my-4 rounded-2xl`}>
        <Text className={'text-3xl text-center font-bold m-auto'}>{time.match(/[0-9]?[0-9][a|p][m]/)}</Text>
    </TouchableOpacity>
  )
}
//takenApts.includes(timeString)
export default TimesAva














