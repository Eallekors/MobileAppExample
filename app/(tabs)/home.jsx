import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import Header from '../../components/Header';
import { styles } from './styles';
import CategoryBox from '../../components/CategoryBox';
import ProductHomeItem from '../../components/ProductHomeItem';
import { router } from 'expo-router';
import { databases } from '../../lib/appwriteConfig'; // Import your Appwrite config
import { categories } from '../../data/categories'


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [keyword, setKeyword] = useState();
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true);

  const DATABASE_ID = '6727c79b002607718e69';
  const COLLECTION_ID = '6727c7ad0003a6a6d696';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const productsData = response.documents;

      setProducts(productsData);
      setFilteredProducts(productsData); // Initialize filteredProducts with all products
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts(); // Fetch products whenever the Home screen is focused
      console.log('Home screen is focused!');

      return () => {
        console.log('Home screen is unfocused!');
      };
    }, []) // Empty dependency array ensures it only runs on focus/unfocus
  );

  useEffect(() => {
    let updatedProducts = products;

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter((product) => product?.category === selectedCategory);
    }

    if (keyword) {
      updatedProducts = updatedProducts.filter((product) => product?.title?.includes(keyword));
    }

    setFilteredProducts(updatedProducts); // Update the filtered products based on selection
  }, [selectedCategory, keyword, products]);

  const renderCategoryItem = ({ item }) => {
    return (
      <CategoryBox
        onPress={() => setSelectedCategory(item?.id)}
        isSelected={item.id === selectedCategory}
        title={item?.title}
        image={item?.image}
      />
    );
  };

  const renderProductItem = ({ item }) => {
    const onProductPress = (product) => {
      router.push({
        pathname: '/details',
        params: { details: JSON.stringify(product) },
      });
    };

    return <ProductHomeItem onPress={() => onProductPress(item)} {...item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Header showSearch={true} onSearchKeyword={setKeyword} keyword={keyword} title="Find All You Need" />

        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => String(index)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            numColumns={2}
            data={filteredProducts} // Use filteredProducts here
            renderItem={renderProductItem}
            keyExtractor={(item) => String(item.$id)}
            ListFooterComponent={<View style={{ height: 250 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
