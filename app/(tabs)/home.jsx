import { SafeAreaView, Text, View, FlatList } from 'react-native'
import SafeViewAndroid from '../SafeViewAndroid'
import React from 'react'
import Header from '../../components/Header'
import { styles } from './styles'
import { categories } from '../../data/categories'
import CategoryBox from '../../components/CategoryBox'


const Home = () => {
  const renderCategoryItem = ({item}) => {
    //console.log('item => ', item)
    return (
      <CategoryBox title={item?.title} image={item?.image} />
    )
  }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <Header showSearch={true} title="Find All You Need"/>
        <FlatList 
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        horizontal
        data={categories} 
        renderItem={renderCategoryItem} 
        keyExtractor={(item, index) => String(index)} 
        />
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  )
}
export default Home
