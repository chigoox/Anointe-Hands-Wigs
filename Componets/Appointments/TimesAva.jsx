import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const TimesAva = ({ time, setAppointments, setNewTakenApt, toggleTapped, setselected, selected }) => {
  const timeNumber = Number(time.substr(2, 4).match(/[0-9]?[0-9]/))
  const timeString = String(time.substr(2, 4).match(/[0-9]?[0-9][a|p][m]/))

  function Tapped() {
    toggleTapped()
    setNewTakenApt(timeString)
    setAppointments(timeNumber, timeString)
    setselected({ [time]: true })
  }
  const Mark = selected ? selected[time] : null
  return (
    <TouchableOpacity onPress={() => { Tapped() }} className={`${false ? 'hidden' : ''} ${Mark ? 'bg-rose-300' : 'bg-slate-100'} m-auto   shadow shadow-slate-400  h-16 w-20 mx-auto my-4 rounded-xl z-0`}>
      <Text className={'text-3xl text-center font-bold m-auto'}>{time.match(/[0-9]?[0-9][a|p][m]/)}</Text>
    </TouchableOpacity>
  )
}
//takenApts.includes(timeString)
export default TimesAva














