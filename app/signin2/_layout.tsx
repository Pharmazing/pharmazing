import { Stack, router } from 'expo-router';
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
          headerShown: true,
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
          headerLeft: () =>
            router.canGoBack() && (
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
        }}
      />
    </Stack>
  );
}
