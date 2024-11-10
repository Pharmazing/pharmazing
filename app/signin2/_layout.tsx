import { Stack, router } from 'expo-router';
import * as Constants from 'expo-constants';
import { Button } from 'react-native';
import { Icon } from '../../src/components';
import { useStyles } from 'react-native-unistyles';

export default function Layout() {
  const { theme } = useStyles();
  return (
    <Stack>
      <Stack.Screen name="signin2b" options={{ headerShown: false }} />
      <Stack.Screen
        name="setlocation"
        options={{
          headerShown: router.canGoBack(),
          headerBackTitleVisible: true,
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: theme.colors.Green500,
            // height: 56,
          },
          headerTitleStyle: {
            fontSize: 24,
            color: 'white',
          },
          headerTitle: 'Find Delivery Location',
          headerLeft: () => (
            <Icon
              name="ChevronRightIcon"
              height={36}
              width={36}
              color={theme.colors.white}
              transform={'rotate(180 12 12)'}
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
