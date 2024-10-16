import { SafeAreaView,Text, View } from 'react-native'
import SafeViewAndroid from '../SafeViewAndroid'
import React from 'react'
const Favorites = () => {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <Text>Favorites</Text>
    </SafeAreaView>
  )
}
export default Favorites
