import { Stack, useLocalSearchParams } from 'expo-router';

export default function Layout() {
  const { id } = useLocalSearchParams();
  return (
    <Stack screenOptions={{ headerShown: false, headerBackTitle: 'Settings' }}>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: `addresses for ${id}`,
          headerBackTitle: 'Settings',
        }}
      />
      <Stack.Screen name="editAddress" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
