import { SafeAreaView, Text, View } from 'react-native'
import SafeViewAndroid from '../SafeViewAndroid'
import React from 'react'
const Home = () => {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <Text>Home</Text>
    </SafeAreaView>
  )
}
export default Home
