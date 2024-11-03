//import { NavigationContainer } from "@react-navigation/native";
import Splash from "../screens/auth"
import Signup from "./(auth)/sign-up"
import Signin from "./(auth)/sign-in";
import SafeViewAndroid from "./SafeViewAndroid"
import { SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { colors } from "../utils/colors";


export default function Index() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} >
      <Splash />
    </SafeAreaView>
  );
}

// export default function Index() {
//   const theme = {
//     colors:{
//       background: colors.white
//     },
//   };

//   return (
//   <NavigationContainer theme={theme}>
//     <Stack.Navigatior>
//     <Stack.Screen name="Splash" component={Splash} />
//     <Stack.Screen name="Signup" component={Signup} />
//     <Stack.Screen name="Signin" component={Signin} />
//     </Stack.Navigatior>
//   </NavigationContainer>
//   );
// }


