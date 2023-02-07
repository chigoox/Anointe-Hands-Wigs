import { SafeAreaView, Text, View, Image, Pressable, StatusBar, ScrollView } from 'react-native';
import React, { useState} from 'react'
import Animated,{ZoomOutEasyDown, ZoomInEasyDown, FadeInUp, FadeOutDown} from 'react-native-reanimated';




export default function AboutPage() {
  return (
    <Animated.ScrollView className={'flex-1 h-screen w-screen'} entering={ZoomInEasyDown} exiting={ZoomOutEasyDown}  contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView className={'flex flex-1 h-full '}>
          <View className={'flex flex-row  py-4 items-center overflow-hidden p-4 m-auto  w-full'}>
            <View className={"bg-slate-600 h-60 w-32 rounded-3xl flex-grow shadow-sm shadow-black"}>
            <Image className={'top-0 right-0 left-0 bottom-0 absolute rounded-3xl z-0 opacity-90'} source={{uri: 'https://s.hdnux.com/photos/52/62/01/11214928/4/1200x0.jpg',}}></Image>

            </View>
            <View className={'flex-grow ml-4 flex flex-row flex-wrap h-40 w-24'}>
              <Text className={'font-bold text-4xl'}>Anointed Hands Wigs</Text>
              <Text className={'font-semibold text-xl text-slate-600'}>Catered to anyone experiencing hair loss.</Text>
            </View>
          </View>
          
          <Animated.View entering={FadeInUp} exiting={FadeOutDown} className={''}>

            <View className="flex justify-around flex-row m-4 my-10">
              <View className={''}>
                <View className="m-auto relative h-28 w-28 rounded-2xl overflow-hidden bg-black">
                  <Image className={'top-0 right-0 left-0 bottom-0 absolute z-0'} source={{uri: 'https://www.ladbible.com/cdn-cgi/image/width=720,quality=70,format=webp,fit=contain,dpr=1/https%3A%2F%2Fs3-images.ladbible.com%2Fs3%2Fcontent%2F3bba25085b2b38a5833f4f36484a383b.png',}}></Image>
                </View>
                <View className={' w-32 '}>
                  <Text className={'font-bold text-2xl text-black break-words h-fit text-center'}>Catered to you</Text> 
                </View>
              </View>

              <View className={''}>
                <View className="m-auto relative h-28 w-28 rounded-2xl overflow-hidden bg-black">
                  <Image className={'top-0 right-0 left-0 bottom-0 absolute z-0'} source={{uri: 'https://cdn.shopify.com/s/files/1/1410/9094/files/cancerblog2_large.jpg?v=1495036454',}}></Image>
                </View>
                <View className={' w-32 '}>
                  <Text className={'font-bold text-2xl text-black break-words h-fit text-center'}>Affordable Prices</Text> 
                </View>
              </View>


              <View className={''}>
                <View className="m-auto relative h-28 w-28 rounded-2xl overflow-hidden bg-black">
                  <Image className={'top-0 right-0 left-0 bottom-0 absolute z-0'} source={{uri: 'https://cdn.shopify.com/s/files/1/0570/3057/4240/files/glueless_lace_front_wig_install-Ballice_600x600.jpg?v=1635386633',}}></Image>
                </View>
                <View className={' w-32 '}>
                  <Text className={'font-bold text-2xl text-black break-words h-fit text-center'}>Directly to your door</Text> 
                </View>
              </View>

            </View>
          </Animated.View>
          
          <View className={'flex flex-row  py-4 items-center overflow-hidden p-4 m-auto  w-full'}>
            <View className={'flex-grow mr-4 flex flex-row flex-wrap h-40 w-24'}>
              <Text className={'font-bold text-4xl text-right'}>My hope</Text>
              <Text className={'font-semibold text-xl text-right text-slate-600'}>to revive the hope and confidence in your self-image</Text>
            </View>
            <View className={"bg-slate-600 h-60 w-32 rounded-3xl break-words flex-grow shadow-sm shadow-black"}>
            
            <Image className={'top-0 right-0 left-0 bottom-0 absolute z-0 rounded-3xl '} source={{uri: 'https://www.cranialprosthesis.net/wp-content/uploads/2020/01/wearing-a-wig-as-a-cancer-patient.jpg',}}></Image>

            </View>
          </View>

          <View className={'h-fit p-4 overflow-hidden w-fit flex flex-row rounded-2xl m-auto'}>
            <View className={''}>
            <Image className={'rounded-3xl h-96 w-full object-contain scale-75 top-22 top-[10%]'} source={require('../assets/Temp.png')}></Image>

              <Text className={'font-bold text-4xl text-center text-white'}>Tricia</Text>
              <Text className="font-semibold text-2xl text-center text-slate-600">
                Meet Tricia, a passionate wig stylist 
                  with a love for hair that dates back 
                  to her childhood. Growing up with a grandmother 
                  who had a collection of wigs, Tricia was fascinated 
                  by the transformative power of hair. She recognizes 
                  that hair plays a significant role in our self-expression 
                  and identity, regardless of gender. Tricia's drive to create
                  this wig line stems from her recognition of a critical
                  need, especially for those who have suffered hair
                  loss due to cancer. During this challenging time,
                  individuals often feel scared and lose hope. 
                </Text>
            </View>
          </View>

          <View className={'p-4 h-72 w-fit rounded-xl'}>
            <Text className={'font-bold text-2xl text-slate-600 text-center m-auto'}>
                Let our wigs transform you from the outside & build home on the 
                inside 🙏🏽 Anointed Hands Wigs..... Let us cover you
              </Text>
          </View>

          <View className={'bg-slate-600 h-72 w-full  relative rounded-t-3xl top-10'}>
            <View className={'absolute z-10 top-20  rounded-full p-4  w-full'}>
              <View className={'m-auto bg-red-50 rounded-lg p-2'}>
              <Text className={'font-bold text-2xl text-slate-900 text-center'}>Affordable wig's because we care about your healing ❤️‍🩹</Text>

              </View>
            </View>
            <View className={'relative'}>
              <Image className={'z-0 h-full object-cover  rounded-t-3xl'} source={{uri: 'https://cdn3.poz.com/125212_iStock-491992363.jpg_0455d4f4-424f-4820-bd38-63f3fefcd77e.jpg',}}></Image>
            </View>
          </View>

      </SafeAreaView>
    </Animated.ScrollView>
  )
}

