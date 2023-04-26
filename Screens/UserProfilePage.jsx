import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeInUp,
  FadeOutRight,
  FadeOutUp,
  ZoomOutEasyDown,
  ZoomInEasyDown,
  FadeInLeft,
  FadeOutLeft,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import {
  handleInput5,
  addUserInfoToDatabase,
  getSignedInUser,
} from "../MyCodes/ed5";
import Profile from "../Componets/UserProfile/Profile";
import Orders from "../Componets/UserProfile/Orders";
import Appointments from "../Componets/UserProfile/Appointments";


function UserProfilePage({ navigation }) {
  const [userData, setUserData] = useState();
  const [inputData, setInputData] = useState();
  const [user, setUser] = useState();
  const getuserData = () => { getSignedInUser(setUser, setUserData) }
  const [selectedScreen, setSelectedScreen] = useState({ Profile: true, Orders: false, Appointment: false })
  const toggleSeletectedScreen = (screen) => {
    setSelectedScreen({ Profile: false, Orders: false, Appointment: false })
    setSelectedScreen((old) => {
      return (
        { ...old, [screen]: true }
      )
    })
  }

  const submit = () => {
    //handleCardDetails()
    setInputData((old) => {
      if (typeof zip == "object" && zipcode && zip?.places) {
        return {
          ...old,
          state: zip?.places[0].state,
          city: zip?.places[0]["place name"],
          stateAB: zip?.places[0]["state abbreviation"],
        };
      }
    });

    navigation.goBack();
  };



  useEffect(() => {
    getSignedInUser(setUser, setUserData);
    if (inputData) addUserInfoToDatabase({ userDetails: inputData }, user);
  }, [inputData]);


  function SelectedView() {
    if (selectedScreen.Profile) return <Profile userData={userData} user={user} navigation={navigation} />
    if (selectedScreen.Orders) return <Orders getuserData={getuserData} userData={userData} user={user} />
    if (selectedScreen.Appointment) return <Appointments user={user ? user : ''} appointmentData={userData?.Appointment ? userData?.Appointment : ''} />
  }

  function Menu({ name, tab, selected }) {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        className={`${selected ? 'bg-pink-300 h-20 w-36' : 'bg-pink-100 h-16 w-32'} duration-1000 ease-in-out m-4 rounded-3xl transition-all`}
      >
        <TouchableOpacity className={"h-full"} onPress={() => { tab(name) }}>
          <Text className={"font-semibold text-2xl text-center m-auto"}>
            {name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutRight}
      className={
        "absolute h-screen w-full z-20 bg-white transition-all duration-[20] ease-in-out"
      }
    >
      <SafeAreaView className={"my-10 mx-2"}>
        <Text className={"font-bold text-center text-5xl text-sky-300"}>Dashboard</Text>
        <Animated.View entering={ZoomInEasyDown} exiting={ZoomOutEasyDown}>
          <View className={"flex flex-row flex-wrap justify-center"}>
            <Menu name={"Profile"} tab={toggleSeletectedScreen} selected={selectedScreen?.Profile} />
            <Menu name={"Orders"} tab={toggleSeletectedScreen} selected={selectedScreen?.Orders} />
            <Menu name={"Appointment"} tab={toggleSeletectedScreen} selected={selectedScreen?.Appointment} />
          </View>
          <ScrollView className={'h-[70%] border-t-4 rounded-xl border-pink-200'}>
            <SelectedView />
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
}

export default UserProfilePage;
