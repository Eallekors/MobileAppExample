import React, { useState, useEffect } from "react";
import { View, Text, Linking, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@components/Header";
import ListItem from "@components/ListItem";
import { styles } from "./styles";
import EditableBox from "@components/EditableBox";
import Button from "@components/Button";
import Footer from "@components/Footer";
import { account } from "@lib/appwriteConfig";  

const Settings = () => {
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState({ name: '', email: '' });
    const [password, setPassword] = useState(''); 
    const [originalEmail, setOriginalEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await account.get(); 
                setValues({ name: user.name || 'User', email: user.email || 'user@mail.com' });
                setOriginalEmail(user.email); 
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onEditPress = () => {
        setEditing(true);
    };

    const onSave = async () => {
        setEditing(false);

        try {
           
            if (values.name !== '') {
                await account.updateName(values.name); 
            }

           
            if (values.email !== originalEmail) {
                if (!password) {
                    Alert.alert("Error", "Please provide your password to update your email.");
                    setEditing(true); 
                    return;
                }
                await account.updateEmail(values.email, password); 
            }

            Alert.alert("Success", "Your information has been updated.");
        } catch (error) {
            console.error("Failed to update user information:", error);

            if (error.code === 401) {
                Alert.alert("Error", "Incorrect password. Please try again.");
            } else if (error.code === 400) {
                Alert.alert("Error", "Incorrect password. Please try again.");
            } else {
                Alert.alert("Error", "An error occurred while updating your information.");
            }

            setEditing(true);
        }
    };

    const onItemPress = () => {
        Linking.openURL('https://google.com');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header title="Settings" />
            <View style={styles.container}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Pressable onPress={onEditPress}>
                        <Image style={styles.icon} source={require('@assets/icons/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox onChangeText={(v) => onChange('name', v)} label="Name" value={values.name} editable={editing} />
                <EditableBox onChangeText={(v) => onChange('email', v)} label="Email" value={values.email} editable={editing} />
                
              
                {editing && values.email !== originalEmail && (
                    <EditableBox 
                        onChangeText={setPassword} 
                        label="Password" 
                        placeholder="Enter your password" 
                        value={password} 
                        editable={editing} 
                        secureTextEntry
                    />
                )}

                {editing ? (<Button style={styles.button} onPress={onSave} title="Save" />) : null}

                <Text style={styles.sectionTitle}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
                <ListItem onPress={onItemPress} style={styles.item} title="Contact Us" />
                <ListItem onPress={onItemPress} style={styles.item} title="Privacy & Terms" />
            </View>

            <Footer />
        </SafeAreaView>
    );
};

export default Settings;
