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

  // Fetch the logged-in user's ID
  const fetchUserId = useCallback(async () => {
    try {
      const user = await account.get();
      setUserId(user.$id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      Alert.alert("Error", "Failed to retrieve user information.");
    }
  }, []);

  // Fetch only bookmarked items

  const fetchFavorites = useCallback(async () => {
      if (!userId) return; // Ensure userId is available
  
      try {
        const response = await databases.listDocuments(
          '6727c79b002607718e69', // Database ID
          '6727c7ad0003a6a6d696', // Collection ID
          [Query.contains("Bookmarked", [userId])] // Filter items where Bookmarked contains userId
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
          fetchFavorites();  // Fetch favorites when the screen is focused and userId is available
        } else {
          console.log('User ID is not available');
        }
        console.log('Favorites screen is focused!');
    
        return () => {
          console.log('Favorites screen is unfocused!');
        };
      }, [userId]) // Add userId as a dependency
    );
    

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

 
  // Remove from bookmarks
  const removeFromFavorites = async (productId) => {
    try {
      const product = favorites.find(item => item.$id === productId);
      const updatedBookmarked = product.Bookmarked.filter(id => id !== userId);

      await databases.updateDocument(
        product.$databaseId,
        product.$collectionId,
        productId,
        { Bookmarked: updatedBookmarked }
      );

      // Update local favorites state
      setFavorites(favorites.filter(item => item.$id !== productId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
      Alert.alert("Error", "Could not remove the item from favorites.");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <FavoriteItem 
        {...item}
        onPress={() => removeFromFavorites(item.$id)}
      />
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
      <View style={styles.container}>
        <Header title="Favorites" />
        <FlatList 
          data={favorites} 
          renderItem={renderItem}
          keyExtractor={(item) => String(item.$id)} 
          ListEmptyComponent={<Text style={styles.emptyText}>No favorites found</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
