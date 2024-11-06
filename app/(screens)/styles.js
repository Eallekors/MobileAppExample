import { StyleSheet } from "react-native";
import { colors } from "@utils/colors";
export const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        backgroundColor: colors.white
    },
    titleContainer: {
        marginVertical: 54
    },
    image: {
        width: '100%',
        height:200
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center"
    },
    innerTitle: {
        color: "#FCA34D",
        textDecorationLine: "underline"
    },
    footerText: {
        color: '#4F63AC',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 8,
        borderRadius: 8,
        
    }
    
})