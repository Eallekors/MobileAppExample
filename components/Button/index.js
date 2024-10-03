import { router } from "expo-router";
import { styles } from "./styles";
import React from "react";
import { Pressable,Text, TouchableOpacity } from "react-native";

const Button = ({title}) => {

    const handlePress = () => {
        console.log('button is clicked')
        router.push('/sign-up');
    }

    return(
        <TouchableOpacity activeOpacity={0.6} onPress={handlePress} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;