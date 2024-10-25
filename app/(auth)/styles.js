import { StyleSheet,Platform, StatusBar } from "react-native";

import { colors } from "../../utils/colors"

export const styles = StyleSheet.create({
    container: { 
        padding: 24,
    },
    agreeRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreeText: {
        color: colors.blue,
        marginHorizontal: 14
    },
    agreeTextBold: {
        fontWeight: 'bold',
    },
    button: {
      marginVertical: 20,
    
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+10 : 0,
        paddingHorizontal: 15
       
    },
    footerText: {
        color: colors.blue,
        marginTop: 10,
        marginBottom: 56,
        textAlign: 'center'
    },
    footerLink: {
        fontWeight: 'bold'
    }
   
})