import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeViewAndroid from '../SafeViewAndroid';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { styles } from './styles';
import { categories } from '../../data/categories';
import CategoryBox from '../../components/CategoryBox';
import ProductHomeItem from '../../components/ProductHomeItem';
import { router } from 'expo-router';
import { databases } from '../../lib/appwriteConfig'; // Import your Appwrite config

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [keyword, setKeyword] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const DATABASE_ID = '6727c79b002607718e69';
  const COLLECTION_ID = '6727c7ad0003a6a6d696'
  // Function to fetch products from Appwrite
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const productsData = response.documents;

      setSelectedProducts(productsData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory && !keyword) {
      const updatedSelectedProducts = selectedProducts.filter((product) =>
        product?.category === selectedCategory
      );
      setSelectedProducts(updatedSelectedProducts);
    } else if (selectedCategory && keyword) {
      const updatedSelectedProducts = selectedProducts.filter(
        (product) =>
          product?.category === selectedCategory && product?.title?.includes(keyword)
      );
      setSelectedProducts(updatedSelectedProducts);
    } else if (!selectedCategory && keyword) {
      const updatedSelectedProducts = selectedProducts.filter((product) =>
        product?.title?.includes(keyword)
      );
      setSelectedProducts(updatedSelectedProducts);
    } else if (!keyword && !selectedCategory) {
      fetchProducts(); // Refresh all products
    }
  }, [selectedCategory, keyword]);

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
    <SafeAreaView style={{ flex: 1,backgroundColor: '#fff' }}>
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
            data={selectedProducts}
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
