import { SafeAreaView,Text, View } from 'react-native'
import SafeViewAndroid from '../SafeViewAndroid'
import React from 'react'
const Profile = () => {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
     <Text>Profile</Text>
    </SafeAreaView>
  )
}
export default Profile
