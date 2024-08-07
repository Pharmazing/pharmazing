import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editAddress"
        options={{ presentation: 'modal', headerTitle: 'Edit Address' }}
      />
    </Stack>
  );
}
