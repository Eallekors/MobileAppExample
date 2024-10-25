import { SafeAreaView, Text, View, FlatList } from 'react-native'
import SafeViewAndroid from '../SafeViewAndroid'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { styles } from './styles'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import CategoryBox from '../../components/CategoryBox'
import ProductHomeItem from '../../components/ProductHomeItem'
import { router } from 'expo-router'


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [keyword, setKeyword] = useState();
  const [selectedProducts, setSelectedProducts] = useState(products)
  

  useEffect(() => {
    if(selectedCategory && !keyword){
      const updatedSelectedProducts = products.filter((product) =>
        product?.category === selectedCategory)
      setSelectedProducts(updatedSelectedProducts)
    } else if(selectedCategory && keyword){
      const updatedSelectedProducts = products.filter((product) =>
        product?.category === selectedCategory && product?.title?.includes(keyword))
      setSelectedProducts(updatedSelectedProducts)
    } else if(!selectedCategory && keyword){
      const updatedSelectedProducts = products.filter((product) =>
      product?.title?.includes(keyword))
      setSelectedProducts(updatedSelectedProducts)
    } else if(!keyword && !selectedCategory){
      setSelectedProducts(products)
    }
  }, [selectedCategory, keyword])
  /* useEffect(() => {
    if(selectedCategory){
      const updatedSelectedProducts = products.filter((product) =>
        product?.category === selectedCategory)
      setSelectedProducts(updatedSelectedProducts)
    }else{
      setSelectedProducts(products)
    }
  }, [selectedCategory]) */

  const renderCategoryItem = ({item}) => {
    //console.log('item => ', item)
    return (
      <CategoryBox 
      onPress={() => setSelectedCategory(item?.id)}
      isSelected={item.id === selectedCategory}
      title={item?.title} 
      image={item?.image} />
    )
  }

  const renderProductItem = ({item}) => {
    const onProductPress = (product) => {
      router.push({
        pathname: '/details',
        params: { details: JSON.stringify(product) },
      });
     //console.log('item =>' , product)
    }
    
    return (
      <ProductHomeItem onPress={() => onProductPress(item)}
      {...item}/>
    )
  }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <Header showSearch={true} onSearchKeyword={setKeyword} keyword={keyword} title="Find All You Need"/>
        <FlatList 
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        horizontal
        data={categories} 
        renderItem={renderCategoryItem} 
        keyExtractor={(item, index) => String(index)} 
        />
        <FlatList 
        numColumns={2}
        data={selectedProducts} 
        renderItem={renderProductItem} 
        keyExtractor={(item) => String(item.id)} 
        ListFooterComponent={<View style={{height: 250}}/>}/>
      </View>
    </SafeAreaView>
  )
}
export default Home
