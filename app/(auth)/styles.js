import { StyleSheet,Platform, StatusBar } from "react-native";

import { colors } from "../../utils/colors"

export const styles = StyleSheet.create({
    container: { },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+10 : 0,
        paddingHorizontal: 15
       
    }
   
})