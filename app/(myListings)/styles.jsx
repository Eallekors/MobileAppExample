import { StyleSheet } from "react-native";

import { colors } from "@utils/colors";

export const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    list: {
        paddingVertical: 30
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 12
    },
    email:{
        fontSize: 14,
        color: colors.grey
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
})