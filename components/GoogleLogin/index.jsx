import React from "react";
import { Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';

const GoogleLogin = () => {
    const handlePress = () => {
        Alert.alert("Notice", "Google login is not set up yet.");
    };

    return (
        <TouchableOpacity 
            activeOpacity={0.6} 
            style={styles.container} 
            onPress={handlePress} 
        >
            <Image style={styles.image} source={require('@assets/google.png')} />
        </TouchableOpacity>
    );
};

export default GoogleLogin;
