import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import AuthHeader from "../../components/AuthHeader";
import { styles } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Separator from "../../components/Separator";
import { useRouter } from 'expo-router';
import { account } from "../../lib/appwriteConfig"; 
const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      router.push('/home'); // Navigate to home upon successful sign-in
    } catch (error) {
      console.error(error);

      if (error.code === 401) {
        Alert.alert("Sign In Failed", "Invalid email or password.");
      } else {
        Alert.alert("Sign In Failed", error.message);
      }
    }
  };

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const user = await account.get();
        console.log(user.$id)
        router.push('/home'); 
      } catch (error) {
      
      }
    };

    checkLoggedInUser();
  }, []);

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <AuthHeader title="Sign In" targetRoute="/splash"/>
        <Input label="Email" placeholder="example@gmail.com" value={email} onChangeText={setEmail} />
        <Input isPassword label="Password" placeholder="******" value={password} onChangeText={setPassword} />
        <Button style={styles.button} title="Sign in" onPress={handleSignIn} />
        <Separator />
        <Text style={styles.footerText}>
          Don't have an account? 
          <Text style={styles.footerLink}> Sign Up</Text>
        </Text>
      </View>
    </View>
  );
}

export default Signin;
