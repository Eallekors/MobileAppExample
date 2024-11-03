import React, { useEffect } from "react";
import { Text, View, Image, Pressable } from "react-native";
import Button from "../../components/Button";
import { styles } from "./styles";
import { router } from "expo-router";
import { account } from "../../lib/appwriteConfig"; 

const Splash = () => {
    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                await account.get();
                router.push("/home");
            } catch (error) {  
                console.log("No active session found");
            }
        };

        checkLoggedInUser();
    }, []);

    return (
        <View style={styles.container}>
            <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../assets/images/splash_image.png")}
            />
           
            <View style={styles.titleContainer}>
                <Text style={styles.title}>You'll Find </Text>
                <Text style={[styles.title, styles.innerTitle]}>All you need </Text> 
                <Text style={styles.title}>Here </Text>
            </View>
            
            <Button title="Sign up" where="/sign-up" />

            <Pressable onPress={() => router.push("/sign-in")}>
                <Text style={styles.footerText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default Splash;
