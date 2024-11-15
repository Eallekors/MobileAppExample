import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import AuthHeader from "@components/AuthHeader";
import { styles } from "./styles";
import Input from "@components/Input";
import Button from "@components/Button";
import GoogleLogin from "@components/GoogleLogin";
import Separator from "@components/Separator";
import { useRouter } from 'expo-router';
import { account } from "@lib/appwriteConfig"; 

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      router.push('/home'); 
    } catch (error) {
      if (error.code === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else if (error.code === 400 && error.message.includes("email")) {
        setErrorMessage("Please enter a valid email address.");
      } else if (error.code === 400 && error.message.includes("password")) {
        setErrorMessage("Password must be between 8 and 256 characters.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const user = await account.get();
        router.push('/home'); 
      } catch (error) {
      }
    };
    checkLoggedInUser();
  }, []);

  const handleEmailChange = (text) => {
    const trimmedEmail = text.trim();  
    setEmail(trimmedEmail);  
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <AuthHeader title="Sign In" targetRoute="/splash"/>
        <Input 
          label="Email" 
          placeholder="example@gmail.com" 
          value={email} 
          onChangeText={handleEmailChange}  
        />
        <Input 
          isPassword 
          label="Password" 
          placeholder="******" 
          value={password} 
          onChangeText={setPassword} 
        />
        {errorMessage ? (
          <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
        ) : null}
        <Button style={styles.button} title="Sign in" onPress={handleSignIn} />
        <Separator text="Or sign in with" />
        <GoogleLogin />
        <Text style={styles.footerText}>
          Don't have an account? 
          <TouchableOpacity onPress={() => router.push('/sign-up')} style={styles.footerButton}>
            <Text style={ styles.footerLink}> Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Signin;
