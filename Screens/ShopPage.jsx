import { SafeAreaView, Text, View, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import Animated, { ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import Product from '../Componets/ShopScreen/Product';
import { fetchProducts, getRand } from '../MyCodes/ed5'
import mocProducts from '../BackenData/Products'
import UserProfileButton from '../Componets/Universal/UserProfileButton';



export default function ShopPage({ navigation }) {
  const [productsFromDataBase, setProductsFromDataBase] = useState()
  const [productsFormated, setProductsFormated] = useState([])
  const navigate = (to, params) => { navigation.navigate(to, params) }
  const toItemPage = (name, price, img, desc) => { navigate('ProductPage', { name: name, price: price, img: img, desc: desc }) }
  function convertProductToArray() {
    let temp = []
    if (productsFromDataBase) Object.values(productsFromDataBase).forEach((key) => {

      temp = [...temp, key]

    })
    if (Object.keys(productsFromDataBase).length != productsFormated.length) { setProductsFormated(temp) }
  }


  if (productsFromDataBase) convertProductToArray()



  const categories = ['Featured', 'Female', 'Male', 'Boy', 'Girl', 'All']
  const [selected, setSelected] = useState(categories.map((item) => {
    return { [item]: false }
  }))


  let result = true;

  for (let i in selected) {
    if (selected[i] === true) {
      result = false;
      break;
    }
  }

  if (result) setSelected((old) => {
    return { ...old, All: true }
  })


  const categoriesMap = categories.map((item) => {

    const onclick = () => {
      setSelected((old) => {
        Object.keys(old).forEach((key, index) => { old[key] = false })
        return { ...old, [item]: true }
      })
    }

    return (
      <TouchableOpacity name={item} key={item} onPress={onclick} className={`${selected[item] ? 'bg-rose-700' : 'bg-slate-300'} transition-all h-10 ease-in-out duration-1000  w-24 m-2 rounded-full p-2`}>
        <Text className={'text-white text-center font-semibold text-lg'}>{item}</Text>
      </TouchableOpacity>
    )
  })


  useEffect(() => { fetchProducts(setProductsFromDataBase); }, [])
  //create shop items
  const productMap = productsFormated.map(({ name, price, img, desc, category }) => {




    if (selected[category]) {
      return (
        <TouchableOpacity onPress={() => { toItemPage(name, price, img, desc) }} className={` m-auto my-8 focus:opacity-20`} key={`${name + 'bfnm'}`}>
          <Product name={name} price={price} img={img} key={`${name + getRand(9999999)}`} />
        </TouchableOpacity>
      )
    } else if (selected.All) {
      return (
        <TouchableOpacity onPress={() => { toItemPage(name, price, img, desc) }} className={` m-auto my-8 focus:opacity-20`} key={`${name + 'bfnm'}`}>
          <Product name={name} price={price} img={img} key={`${name + getRand(9999999)}`} />
        </TouchableOpacity>
      )
    }
  })





  //shop screen
  return (
    <Animated.ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true} className={'flex-1  w-screen'} entering={ZoomInEasyDown} exiting={ZoomOutEasyDown} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView className={'flex-grow flex-1 h-screenS '}>
        {/*TOP BAR */}
        <View className={'flex flex-row justify-between mx-2'}>
          <Pressable className={'bg-black h-10 w-10 rounded-full'}></Pressable>
          <View>
            <Text className={'text-slate-600 text-center font text-lg'}>Hello name</Text>
            <Text className={'text-slate-800 text-center font-bold text-lg'}>State, City</Text>
          </View>
          <UserProfileButton navigation={navigation} />
        </View>
        {/*Info Box*/}
        <View className="bg-rose-300 h-40 w-[90%] m-auto rounded-[30rem] mt-20 flex flex-row items-center">
          <Image className={'h-[400px] w-[400px] scale-[.44] bottom-2 flex-grow right-28 relative rounded-bl-[200%]'} source={require('../assets/shopPage-iNFObar.png')}></Image>
          <View className={'relative right-[135%] scale-95 w-[50%]  h-full flex-grow  rounded-[30rem] p-4'}>
            <Text className={'font-bold text-white text-3xl'}>Big Sale</Text>
            <Text className={'text-slate-200 text-xl relative'}>Get a new look for upto 50% off</Text>
          </View>
        </View>
        {/*Category Box*/}
        <ScrollView className={''} nestedScrollEnabled={true} horizontal>
          {/* make this into a componet that checks for catigory in backend */}
          <View className={'flex flex-row'}>
            {categoriesMap}
          </View>
        </ScrollView>

        {/*SHOP ITEMS Box*/}
        <Animated.View>
          <View className={'flex flex-row flex-wrap mb-20'}>
            {productMap}
          </View>
        </Animated.View>
      </SafeAreaView>
    </Animated.ScrollView>
  )
}
