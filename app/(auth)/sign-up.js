import {  View } from "react-native";
import AuthHeader from "../../components/AuthHeader";
import { styles } from "./styles";
import SafeViewAndroid from "../SafeViewAndroid";
import Input from "../../components/Input";

const  Signup = () => {
  return (
    <View style={styles.AndroidSafeArea}>
        <View style={styles.container}>
        <AuthHeader title="Sign Up" />
        <Input label="Name" placeholder="John Doe"/>
        <Input label="Email" placeholder="example@gmail.com"/>
        <Input isPassword label="Password" placeholder="******"/>
        </View>
    </View>
  );
}

export default Signup
