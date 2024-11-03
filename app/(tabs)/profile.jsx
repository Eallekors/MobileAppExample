import { Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { styles } from './profile_css';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';
import { router } from 'expo-router';
import { account } from "../../lib/appwriteConfig"; // Import global account instance

const Profile = () => {
  const num = 10;

  const onLogout = async () => {
    try {
      await account.deleteSession('current'); // Delete the current session
      Alert.alert("Logout Successful", "You have been logged out.");
      router.push('/splash'); // Navigate to the splash screen after logout
    } catch (error) {
      console.error(error);
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Header title="Profile" showLogout onLogout={onLogout} />
          <Text style={styles.name}>User name</Text>
          <Text style={styles.email}>User email</Text>
          <ListItem title="My Listings" subtitle={`Already have ${num} listings`} />
          <ListItem title="Settings" subtitle="Account, FAQ, Contact" onPress={() => router.push("/settings")} />
        </View>
        <Button title="Add New Listing" onPress={() => router.push("/createListing")} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
