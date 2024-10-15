import React from "react";
import {Text, View, Image, Pressable} from "react-native";

import Button from "../../components/Button";
import { styles } from "./styles";
import { router } from "expo-router";


const Splash = () => {
    return (
        <View style={styles.container}>
            <Image resizeMode="contain" style={styles.image} source={require('../../assets/images/splash_image.png')} />
           
            <View style={styles.titleContainer}>
                <Text style={styles.title}>You'll Find </Text>
                <Text style={[styles.title,styles.innerTitle]}>All you need </Text> 
                <Text style={styles.title}>Here </Text>
            </View>
            
            <Button title="Sign up" where="/sign-up"/>

            <Pressable onPress={() => router.push("/sign-in")}>
                <Text style={styles.footerText} >Sign In</Text>
            </Pressable>
        </View>
    )
}
 
export default Splash;