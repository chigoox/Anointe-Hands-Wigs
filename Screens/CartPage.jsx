import {
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  ZoomOutEasyDown,
  ZoomInEasyDown,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";
import CartItem from "../Componets/CartScreen/CartItem";
import mocCart from "../BackenData/Carts";
import { getSignedInUser, deleteUserData } from "../MyCodes/ed5";
import { useIsFocused } from "@react-navigation/native";
import CartTotal from "../Componets/CartScreen/CartTotal";
import UserProfileButton from "../Componets/Universal/UserProfileButton";

export default function CartPage({ navigation }) {
  const [signedInUser, setSignedInUser] = useState();
  const [userData, setUserData] = useState();
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
    navigate("CheckOutPage");
  };

  const isFocused = useIsFocused();
  let [CARTTOTAL, setCARTTOTAL] = useState(userData?.CartTotal);
  let [reRender, setReRender] = useState(false);
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
  }, [reRender, isFocused, userData?.CartTotal]);

  if (CARTTOTAL != userData?.CartTotal) {
    getSignedInUser(setSignedInUser, setUserData);
    setCARTTOTAL(userData?.CartTotal);
  }

  return (
    <Animated.View
      className={"flex-1 h-screen w-screen"}
      entering={ZoomInEasyDown}
      exiting={ZoomOutEasyDown}
    >
      <SafeAreaView className={"flex flex-1 h-full "}>
        {/*TOP BAR */}
        <View className={"flex flex-row justify-between mx-2"}>
          <Pressable className={"bg-black h-10 w-10 rounded-full"}></Pressable>
          <View>
            <Text className={"text-slate-800 text-center font-bold text-lg"}>
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
        <Pressable
          onPress={toCheckOut}
          className={"w-[55%] h-24 rounded-full p-2 bg-rose-300"}
        >
          <Text className={"text-4xl font-bold m-auto text-white"}>
            Pay Now
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

//mocCart.cartItems
