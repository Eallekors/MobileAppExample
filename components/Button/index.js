import { router } from "expo-router";
import { styles } from "./styles";
import React from "react";
import { Pressable,Text, TouchableOpacity } from "react-native";

const Button = ({title, where, style, onPress}) => {

    const handlePress = () => {
        if (onPress) {
            onPress(); // Trigger the external onPress if provided
        }
        if (where){
        router.push(where); 
        }

        if(where == '/home'){
            console.log('home');
        }
    }

    return(
        <TouchableOpacity activeOpacity={0.6} onPress={handlePress} style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;