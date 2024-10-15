// app/tabs/_layout.tsx
import { Tabs } from 'expo-router';
import { Image } from 'react-native';


export default function TabsLayout() {
    return (
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => (
              <Image
                source={require('../../assets/icons/home.png')}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: () => (
              <Image
                source={require('../../assets/icons/bookmark.png')}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => (
              <Image
                source={require('../../assets/icons/profile.png')}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
      </Tabs>
    );
  }