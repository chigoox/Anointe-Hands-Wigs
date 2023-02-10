import { SafeAreaView, Text, View, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState} from 'react'
import Animated,{ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown} from 'react-native-reanimated';
import Product from '../Componets/ShopScreen/Product';
import  {fetchProducts} from '../MyCodes/ed5'
import mocProducts from '../BackenData/Products'



export default function ShopPage({ navigation }) {
  const [productsFromDataBase, setProductsFromDataBase] = useState()
  const [productsFormated, setProductsFormated] = useState([])
  const navigate = (to,params) =>{navigation.navigate(to,params)}
  const toItemPage = (name,price,img,desc) => {navigate('ProductPage',{name:name,price:price,img:img,desc:desc})}
  function convertProductToArray(){
    let temp = []
    if(productsFromDataBase)  Object.values(productsFromDataBase).forEach((key)=>{
      
      temp = [...temp, key]

    })
   if (Object.keys(productsFromDataBase).length != productsFormated.length ) {setProductsFormated(temp) }
  }
  

  
  if (productsFromDataBase) convertProductToArray()
  //

  useEffect(()=>{fetchProducts(setProductsFromDataBase); },[])
  //create shop items
  const productMap = productsFormated.map(({ name, price, img, desc})=>{
    return(
      <TouchableOpacity onPress={()=>{toItemPage(name,price,img,desc)}} className={` m-auto my-8 focus:opacity-20`} key={`${name + 'bfnm'}`}>
        <Product name={name} price={price} img={img} key={`${name + 'esgrd'}`}/>
      </TouchableOpacity>
    )
  })





//shop screen
  return (
    <Animated.ScrollView contentContainerStyle={{flexGrow: 1}} nestedScrollEnabled = {true} className={'flex-1  w-screen'} entering={ZoomInEasyDown} exiting={ZoomOutEasyDown}  contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView className={'flex-grow flex-1 h-screenS '}>
      {/*TOP BAR */}
       <View className={'flex flex-row justify-between mx-2'}>
        <Pressable className={'bg-black h-10 w-10 rounded-full'}></Pressable>
        <View>
          <Text className={'text-slate-600 text-center font text-lg'}>Hello name</Text>
          <Text className={'text-slate-800 text-center font-bold text-lg'}>State, City</Text>
        </View>
        <View className={'h-10 w-10 rounded-full overflow-hidden'}>
          <Image className={'top-0 right-0 left-0 bottom-0 absolute rounded-3xl z-0 opacity-90'} source={{uri: 'https://s.hdnux.com/photos/52/62/01/11214928/4/1200x0.jpg',}}></Image>
        </View>
       </View>

       {/*Info Box*/}
       <View className="bg-rose-300 h-40 w-[90%] m-auto rounded-[30rem] mt-20 flex flex-row flex-1">
          <Image className={'h-[400px] w-[400px] scale-[.42] bottom-32 rounded-bl-[200%] right-28'} source={require('../assets/shopPage-iNFObar.png')}></Image>
          <View className={'relative right-[137%] w-[50%] h-full rounded-[30rem] p-4'}>
            <Text className={'font-bold text-white text-3xl'}>Big Sale</Text>
            <Text className={'text-slate-200 text-xl'}>Get a new look for upto 50% off</Text>
          </View>
       </View>
       {/*Category Box*/}
       <ScrollView className={''} nestedScrollEnabled = {true} horizontal>
          {/* make this into a componet that checks for catigory in backend */}
         <View className={'flex flex-row'}>
          <View className={'bg-slate-300 h-8 w-24 m-2 rounded-full'}>
            <Text className={'text-white text-center font-semibold p-1 text-lg'}>Featured</Text>
          </View>
          <View className={'bg-slate-300 h-8 w-24 m-2 rounded-full'}>
            <Text className={'text-white text-center font-semibold p-1 text-lg'}>Women</Text>
          </View>
          <View className={'bg-slate-300 h-8 w-24 m-2 rounded-full'}>
            <Text className={'text-white text-center font-semibold p-1 text-lg'}>Boys</Text>
          </View>
          <View className={'bg-slate-300 h-8 w-24 m-2 rounded-full'}>
            <Text className={'text-white text-center font-semibold p-1 text-lg'}>Girls</Text>
          </View>
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
