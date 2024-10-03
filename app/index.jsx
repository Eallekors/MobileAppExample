import Splash from "../screens/auth"
import SafeViewAndroid from "./SafeViewAndroid"
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} >
      <Splash />
    </SafeAreaView>
  );
}
