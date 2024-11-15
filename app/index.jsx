//import { NavigationContainer } from "@react-navigation/native";
import Splash from "./(screens)/splash"
import Signup from "./(auth)/sign-up"
import Signin from "./(auth)/sign-in";
import SafeViewAndroid from "./SafeViewAndroid"
import { SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { colors } from "@utils/colors";


export default function Index() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} >
      <Splash />
    </SafeAreaView>
  );
}




