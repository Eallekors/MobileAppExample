import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import Header from '@components/Header';
import { styles } from './styles';
import ProductHomeItem from '@components/ProductHomeItem';
import { router } from 'expo-router';
import { account, databases } from '@lib/appwriteConfig'; // Import Appwrite config

const ProfileListings = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // User's products
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // To store user ID

  const DATABASE_ID = '6727c79b002607718e69';
  const COLLECTION_ID = '6727c7ad0003a6a6d696';

  const onBackPress = () => {
    router.back();
};
  // Fetch current user's ID
  const fetchCurrentUser = async () => {
    try {
      const user = await account.get();
      setUserId(user.$id); // Store user ID
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  // Fetch user's listings from Appwrite
  const fetchUserListings = async () => {
    if (!userId) return; // Only fetch if userId is available
    try {
      setLoading(true);
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const productsData = response.documents;

      // Filter products to only show user's own listings
      const userProducts = productsData.filter((product) => product.Author === userId); // Adjust the field name if necessary

      setFilteredProducts(userProducts); // Update the state with filtered products
    } catch (error) {
      console.error('Failed to fetch user listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCurrentUser(); // Fetch current user
      return () => {
        setProducts([]); // Clear products when leaving the screen to avoid stale data
        setFilteredProducts([]);
      };
    }, [])
  );

  // Watch userId for changes and fetch listings accordingly
  useEffect(() => {
    if (userId) {
      fetchUserListings(); // Fetch user's own listings if userId is available
    }
  }, [userId]);

  const renderProductItem = ({ item }) => {
    const onProductPress = (product) => {
      /* router.push({
        pathname: '/details',
        params: { details: JSON.stringify(product) },
      }); */
    };

    return <ProductHomeItem onPress={() => onProductPress(item)} {...item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Header showBack={true} onBackPress={onBackPress} title="Your Listings" />

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            numColumns={2}
            data={filteredProducts} // Use filteredProducts here (user's own listings)
            renderItem={renderProductItem}
            keyExtractor={(item) => String(item.$id)}
            ListFooterComponent={<View style={{ height: 250 }} />}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text style={{ fontSize: 18, color: 'gray' }}>You have no listings yet.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileListings;
