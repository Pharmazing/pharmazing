import { Stack, router } from 'expo-router';
import * as Constants from 'expo-constants';
import { Button } from 'react-native';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="signin2b" options={{ headerShown: false }} />
      <Stack.Screen
        name="setlocation"
        options={{
          headerShown: router.canGoBack(),
          headerBackTitleVisible: true,
          headerBackTitle: 'Back',
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => {
                if (router.canGoBack()) router.back();
              }}
            />
          ),
          contentStyle: {
            paddingTop: router.canGoBack()
              ? 0
              : Constants.default.statusBarHeight,
          },
        }}
      />
    </Stack>
  );
}
