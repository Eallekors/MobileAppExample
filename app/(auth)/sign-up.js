import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import AuthHeader from "../../components/AuthHeader";
import { styles } from "./styles";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import Separator from "../../components/Separator";
import { account } from "../../lib/appwriteConfig"; 
import { ID } from "react-native-appwrite"; 
import { router } from "expo-router";

const Signup = () => {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        await account.get();
        router.push('/home'); 
      } catch (error) {
      
      }
    };

    checkLoggedInUser();
  }, []);

  const handleSignUp = async () => {
    if (!checked) {
      Alert.alert("Please agree to the Terms and Privacy Policy.");
      return;
    }

    try {
      const response = await account.create(ID.unique(), email, password, name);
      //Alert.alert("Sign Up Successful", `User ID: ${response.$id}`);
      router.push('/home'); 
    } catch (error) {
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <AuthHeader title="Sign Up" targetRoute="/splash" />
        <Input label="Name" placeholder="John Doe" value={name} onChangeText={setName} />
        <Input label="Email" placeholder="example@gmail.com" value={email} onChangeText={setEmail} />
        <Input isPassword label="Password" placeholder="******" value={password} onChangeText={setPassword} />
        <View style={styles.agreeRow}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
        </View>
        <Button style={styles.button} title="Sign Up" onPress={handleSignUp} />
        <Separator />
        <Text style={styles.footerText}>Already have an account? <Text style={styles.footerLink}>Sign In</Text></Text>
      </View>
    </View>
  ); 
};

export default Signup;
