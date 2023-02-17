import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

function CartTotal({CARTTOTAL}) {




    useEffect(()=>{
    },[])
  return (
    <Text className={'text-4xl font-bold '}> {(CARTTOTAL && CARTTOTAL > 0) ? ('$'+ CARTTOTAL) : '$0.00'}</Text>
  )
}

export default CartTotal