import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { colors } from '@utils/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { borderTopColor: colors.lightGray },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/home_focused.png')
                  : require('../../assets/icons/home.png')
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/favorites_focused.png')
                  : require('../../assets/icons/favorites.png')
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/profile_focused.png')
                  : require('../../assets/icons/profile.png')
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
