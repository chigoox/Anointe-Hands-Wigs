import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { deleteAdminData5, deleteUserData5 } from '../../MyCodes/ed5'

export default function Appointments({ appointmentData, user }) {
    const { date, price, timeString } = appointmentData
    const [deletedApt, setDeletedApt] = useState(false)
    const toggleDeletedApt = () => { setDeletedApt(!deletedApt) }

    function cancelApt() {
        deleteAdminData5('Appointments', 'Appointments', `${date}.${timeString}`)
        deleteUserData5(user, 'Appointment')
        toggleDeletedApt()
    }


    return (
        <View>
            <Text className={'text-black font-bold text-2xl text-center mt-10'}>Appointment</Text>
            {appointmentData && <View className={`${deletedApt ? 'hidden' : ''} border-4 border-sky-400 h-32 m-4 w-[90%] rounded-xl`}>
                <View className="flex flex-row justify-around">
                    <Text className={'text-center text-2xl'}>date</Text>
                    <Text className={'text-center text-2xl left-10'}>time</Text>
                    <Text className={'text-center text-2xl left-4'}>price</Text>
                </View>
                <View className="flex flex-row justify-around">
                    <Text className="font-bold text-center text-2xl">{date}</Text>
                    <Text className="font-bold text-center text-2xl">{timeString}</Text>
                    <Text className="font-bold text-center text-2xl">{price}</Text>
                </View>
                <TouchableOpacity onPress={cancelApt} className={'border-4 border-pink-200 h-10  bg-rose-200 w-[60%] m-auto rounded-full'}>
                    <Text className={'font-bold m-auto text-xl'}>Cancel</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}