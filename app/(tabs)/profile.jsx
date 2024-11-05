import { Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { styles } from './profile_css';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import Button from '../../components/Button';
import { router } from 'expo-router';
import { account,databases } from "../../lib/appwriteConfig"; // Import global account instance

const Profile = () => {
  const [numListings, setNumListings] = useState(0); // State to store number of listings

  const fetchUserListings = async () => {
    try {
      const user = await account.get(); // Fetch current user
      const userId = user.$id; // Get user ID
      const DATABASE_ID = '6727c79b002607718e69'; // Your database ID
      const COLLECTION_ID = '6727c7ad0003a6a6d696'; // Your collection ID

      // Fetch documents from the database
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const productsData = response.documents;

      // Filter products to count only the user's listings
      const userListingsCount = productsData.filter((product) => product.Author === userId).length; // Adjust if needed
      setNumListings(userListingsCount); // Set the number of listings
    } catch (error) {
      console.error("Failed to fetch user listings:", error);
      Alert.alert("Error", "Could not fetch listings.");
    }
  };

  useEffect(() => {
    fetchUserListings(); // Fetch user's listings on component mount
  }, []);

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
          <ListItem title="My Listings" subtitle={`Already have ${numListings} listings`} onPress={() => router.push("/listings")} />
          <ListItem title="Settings" subtitle="Account, FAQ, Contact" onPress={() => router.push("/settings")} />
        </View>
        <Button title="Add New Listing" onPress={() => router.push("/createListing")} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
