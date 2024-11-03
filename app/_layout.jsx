import { Stack } from "expo-router";
import Settings from "./(settings)/settings";
export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index"  />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
    </Stack>
  );
}
