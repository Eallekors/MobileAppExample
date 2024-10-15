import React, { useState } from "react";
import { View, Text } from "react-native";
import AuthHeader from "../../components/AuthHeader";
import { styles } from "./styles";
import SafeViewAndroid from "../SafeViewAndroid";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import Separator from "../../components/Separator";
import GoogleLogin from "../../components/GoogleLogin";

const  Signin = () => {
  const [checked, setChecked] = useState(false)
  return (
    <View style={styles.AndroidSafeArea}>
        <View style={styles.container}>
        <AuthHeader title="Sign In" />
        <Input label="Email" placeholder="example@gmail.com"/>
        <Input isPassword label="Password" placeholder="******"/>
       
        <Button style={styles.button} title="Sign in"/>
        <Separator text="Or sign in with" />
        <GoogleLogin />
        <Text style={styles.footerText}>Don't have an account?
          <Text style={styles.footerLink}>Sign Up</Text>
        </Text>
        </View>
    </View>
  );
}

export default Signin
