import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  ZoomOutEasyDown,
  ZoomInEasyDown,
  FadeInUp,
  FadeOutDown,
  SlideInDown,
  SlideOutDown,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  FadeInDown,
} from "react-native-reanimated";
import CartItem from "../Componets/CartScreen/CartItem";
import mocCart from "../BackenData/Carts";
import { getSignedInUser, deleteUserData } from "../MyCodes/ed5";
import { useIsFocused } from "@react-navigation/native";
import CartTotal from "../Componets/CartScreen/CartTotal";
import UserProfileButton from "../Componets/Universal/UserProfileButton";
import LogoutButton from "../Componets/Universal/LogoutButton";

export default function CartPage({ navigation }) {
  const [signedInUser, setSignedInUser] = useState();
  const [userData, setUserData] = useState();
  const isFocused = useIsFocused();
  const [CARTTOTAL, setCARTTOTAL] = useState(userData?.CartTotal);
  const [noCart, setNoCart] = useState(false);

  const toggleNoCart = () => { setNoCart(!noCart) }
  const deleteCartItem = (name) => {
    deleteUserData(signedInUser, name);
  };
  const navigate = (to, params) => {
    navigation.navigate(to, params);
  };
  const toItemPage = (name, price, img, desc) => {
    navigate("ProductPage", { name: name, price: price, img: img, desc: desc });
  };
  const toCheckOut = () => {
    (CARTTOTAL > 0) ? navigate("CheckOutPage") : setNoCart(true)
  };


  if (noCart) setTimeout(() => { toggleNoCart() }, 1000)


  const fetchData = () => {
    getSignedInUser(setSignedInUser, setUserData);
  };

  const cartMap = userData?.Cart
    ? Object.values(userData.Cart).map(({ name, price, img, desc }) => {
      return (
        <CartItem
          signedInUser={signedInUser}
          img={img}
          name={name}
          price={price}
          desc={desc}
          key={`${name} ${price}`}
          deleteCartItem={(name) => {
            deleteCartItem(name);
          }}
          setCARTTOTAL={setCARTTOTAL}
          toItemPage={toItemPage}
          fetchData={fetchData}
          cartTotal={CARTTOTAL}
        />
      );
    })
    : [];

  useEffect(() => {
    getSignedInUser(setSignedInUser, setUserData);
  }, [isFocused, userData?.CartTotal]);

  if (CARTTOTAL != userData?.CartTotal) {
    getSignedInUser(setSignedInUser, setUserData);
    setCARTTOTAL(userData?.CartTotal);
  }

  return (
    <Animated.View
      className={"flex-1 h-screen w-screen"}
      entering={FadeInDown}
      exiting={ZoomOutEasyDown}
    >
      <SafeAreaView className={"flex flex-1 h-full "}>
        {!userData && <View className="z-40 absolute h-screen bottom-0 top-0 flex w-full">
          <ActivityIndicator size="large" className={'m-auto text-red-900'} color={'pink'} />
        </View>}
        {/*TOP BAR */}
        <View className={"flex flex-row justify-between mx-2"}>
          <LogoutButton navigation={navigation} />
          <View>
            <Text className={'font-bold text-3xl text-center'}>
              Cart
            </Text>
          </View>
          <UserProfileButton navigation={navigation} />
        </View>

        {/* Cart Items */}
        <ScrollView className={"p-6 shadow-black shadow-md"}>
          {cartMap}
        </ScrollView>
      </SafeAreaView>
      {/* CheckOut */}
      <View className={"bottom-4 flex flex-row justify-between p-4"}>
        <View className={"h-44 p-2"}>
          <Text className={"text-3xl font-semibold text-slate-600"}>Total</Text>
          <CartTotal CARTTOTAL={CARTTOTAL} />
        </View>
        <TouchableOpacity
          onPress={toCheckOut}
          className={"w-[55%] h-24 rounded-full justify-center p-2 bg-rose-300 relative flex-row flex"}
        >
          {noCart && <Animated.Text entering={SlideInRight} exiting={SlideOutLeft} className={'absolute -top-8 font-semibold text-rose-900 text-xl'}>No itmes in cart</Animated.Text>}
          <Text className={"text-4xl font-bold m-auto text-white"}>
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

//mocCart.cartItems
