import React, { useState, useEffect } from "react";
import { View, Text, Linking, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ListItem from "../../components/ListItem";
import { styles } from "./styles";
import EditableBox from "../../components/EditableBox";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import { account } from "../../lib/appwriteConfig";  // Assuming you're using Appwrite for authentication

const Settings = () => {
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState({ name: '', email: '' });
    const [password, setPassword] = useState(''); // Password input for updating email

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await account.get();  // Get the logged-in user's data
                setValues({ name: user.name || 'User', email: user.email || 'user@mail.com' }); // Update state with user's name and email
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
            // Update the name and email using Appwrite
            if (values.name !== '') {
                await account.updateName(values.name); // Update name
            }
            if (values.email !== '') {
                if (!password) {
                    Alert.alert("Error", "Please provide your password to update your email.");
                    return;
                }
                await account.updateEmail(values.email, password); // Update email with password
            }
            Alert.alert("Success", "Your information has been updated.");
        } catch (error) {
            console.error("Failed to update user information:", error);
            Alert.alert("Error", "An error occurred while updating your information.");
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
                        <Image style={styles.icon} source={require('../../assets/icons/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox onChangeText={(v) => onChange('name', v)} label="Name" value={values.name} editable={editing} />
                <EditableBox onChangeText={(v) => onChange('email', v)} label="Email" value={values.email} editable={editing} />
                
                {/* Only show the password field if editing */}
                {editing && (
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
