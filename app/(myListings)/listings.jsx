import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { account, databases } from '@lib/appwriteConfig';
import FavoriteItem from '@components/FavoriteItem';
import Header from '@components/Header';
import { Query } from 'react-native-appwrite';
import { useFocusEffect } from 'expo-router';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);


  const fetchUserId = useCallback(async () => {
    try {
      const user = await account.get();
      setUserId(user.$id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      Alert.alert("Error", "Failed to retrieve user information.");
    }
  }, []);

 
  const fetchFavorites = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await databases.listDocuments(
        '6727c79b002607718e69', 
        '6727c7ad0003a6a6d696', 
        [Query.contains("Author", [userId])] 
      );

      setFavorites(response.documents);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      Alert.alert("Error", "Failed to load favorite items.");
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchFavorites();  
      }
      return () => {};
    }, [userId]) 
  );

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  
  const confirmAndRemoveFromFavorites = (productId) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => removeFromFavorites(productId) }
      ]
    );
  };

  
  const removeFromFavorites = async (productId) => {
    try {
      await databases.deleteDocument(
        '6727c79b002607718e69', // Database ID
        '6727c7ad0003a6a6d696', // Collection ID
        productId
      );

      
      setFavorites(favorites.filter(item => item.$id !== productId));
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Could not delete the item.");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <FavoriteItem 
        {...item}
        onPress={() => confirmAndRemoveFromFavorites(item.$id)}
        screen="listings"
      />
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
      <View style={styles.container}>
        <Header title="My listings" />
        <FlatList 
          data={favorites} 
          renderItem={renderItem}
          keyExtractor={(item) => String(item.$id)} 
          ListEmptyComponent={<Text style={styles.emptyText}>No listings found</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
