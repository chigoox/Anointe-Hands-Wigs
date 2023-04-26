import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";



export default function Orders({ userData, user, getuserData }) {
    const [filterCompleted, setFilterCompleted] = useState({ all: false, complete: false, active: true })

    function handleOrderButton(name) {
        setFilterCompleted({ all: false, complete: false, active: false })
        setFilterCompleted((old) => { return { ...old, [name]: true } })
        //getuserData()
    }

    const OrderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { }} className={` ${false ? 'absolute right-[900%] scale-0 h-0 w-0' : 'w-full h-12'} flex flex-row justify-around p-2  shadow-black bg-white shadow-sm my-3 duration-1000 transition-all`}>
                <View className={'w-[25%] h-full p-1'}>
                    <Text className={'m-auto text-lg font-bold'}>{item.OrderNumber}</Text>

                </View>
                <View className={'left-5  w-20 overflow-hidden'}>
                    <Text className={'my-auto text-xs'}>{`${Object.keys(item.items)}`}</Text>
                </View>
                <View className={' w-[70%] h-full'}>
                    <View className={' w-full h-[50%] flex flex-row justify-around'}>
                        <Text className={'text-2xl font-semibold text-end'}>{item.x}</Text>
                        <Text className={'m-auto'}>{`Total:${item.Total} QTY:${Object.keys(item.items).length}`}</Text>
                        {!item.complete && <BouncyCheckbox className={' h-8 w-8 '} onPress={(isChecked = true) => { }} isChecked={true} />}
                    </View>
                    <View className={'p-2  w-full h-[50%] flex flex-row justify-between'}>
                        <Text className={'text-4xl font-bold'}>xxx</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const orders = userData?.Orders ? Object.values(userData.Orders).map((item) => {
        if (filterCompleted.complete && item.complete) {
            return <OrderItem item={item} key={item.OrderNumber} />
        } else if (filterCompleted.active && !item.complete) {
            return <OrderItem item={item} key={item.OrderNumber} />
        } else if (filterCompleted.all) {
            return <OrderItem item={item} key={item.OrderNumber} />
        }



    }) : []


    return (
        <View>
            <Text className={'text-black font-bold text-2xl text-center mt-10'}>Orders</Text>
            <View className={'flex flex-row  justify-around'}>
                <TouchableOpacity onPress={() => { handleOrderButton('all') }} name={'all'} className={`${filterCompleted.all ? 'h-20' : 'h-12'} transition-all m-auto w-20 rounded-full bg-sky-300`}>
                    <Text className={'m-auto font-bold'}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleOrderButton('active') }} name={'active'} className={`${filterCompleted.active ? 'h-20' : 'h-12'} transition-all m-auto w-20 rounded-full bg-sky-300`}>
                    <Text className={'m-auto font-bold'}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleOrderButton('complete') }} name={'complete'} className={`${filterCompleted.complete ? 'h-20' : 'h-12'} transition-all m-auto w-20 rounded-full bg-sky-300`}>
                    <Text className={'m-auto font-bold'}>complete</Text>
                </TouchableOpacity>
            </View>
            <View>
                {orders}
            </View>
        </View>
    )
}