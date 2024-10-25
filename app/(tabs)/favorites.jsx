import { SafeAreaView,Text, View, FlatList } from 'react-native';
import SafeViewAndroid from '../SafeViewAndroid';
import React from 'react';
import { styles } from './styles';
import { products } from '../../data/products';
import FavoriteItem from '../../components/FavoriteItem';
import Header from '../../components/Header';


const Favorites = () => {
  const renderItem = ({item}) => {
    return (
      <FavoriteItem 
        {...item}
      />
    )
  }
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <Header title="Favorites"/>
        <FlatList data={products} renderItem={renderItem}
        keyExtractor={(item) => String(item.id)} />
      </View>
    </SafeAreaView>
  )
}
export default Favorites
