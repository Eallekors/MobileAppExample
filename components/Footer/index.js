import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Footer = () => {
  const router = useRouter();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
        <Image
          source={require('../../assets/icons/home.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/favorites')}>
        <Image
          source={require('../../assets/icons/favorites.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
        <Image
          source={require('../../assets/icons/profile_focused.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Light grey for the border
    backgroundColor: '#fff', // Background color of the footer
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Footer;
