import React from "react";
import { Pressable, Image, Text, View } from "react-native";
import { styles } from "./styles";
import { router } from "expo-router";

const AuthHeader = ({ title, targetRoute }) => {
    return (
        <View style={styles.container}>
            <Pressable hitSlop={20} onPress={() => router.push(targetRoute)}>
                <Image style={styles.image} source={require("@assets/auth_back.png")}/>
            </Pressable>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}
export default AuthHeader