import { Stack } from 'expo-router';
import * as Constants from 'expo-constants';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="signin2b" options={{ headerShown: false }} />
      <Stack.Screen
        name="setlocation"
        options={{
          headerShown: false,
          contentStyle: {
            paddingTop: Constants.default.statusBarHeight,
          },
        }}
      />
    </Stack>
  );
}
