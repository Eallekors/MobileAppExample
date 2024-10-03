import { StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 54,
        flexDirection: "row",
        alignItems: 'center',
    },
    image: {
        width: 18,
        height: 18
    },
    title: {
        color: colors.blue,
        fontSize: 26,
        fontWeight: '500',
        paddingHorizontal: 16
    },
    
})