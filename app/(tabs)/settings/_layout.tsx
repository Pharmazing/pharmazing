import { router, Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import { Icon } from '../../../src/components';

export default function Layout() {
  const { theme } = useStyles();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.tabsContentBg },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Settings',
          headerStyle: { backgroundColor: theme.colors.Green400 },
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="prescriptions"
        options={{
          headerLeft: () => (
            <Icon
              name="ChevronRightIcon"
              transform={'rotate(180 12 12)'}
              color={theme.colors.white}
              height={36}
              width={36}
              onPress={() => router.back()}
            />
          ),
          headerTitle: 'Prescriptions',
          headerBackTitle: 'Settings',
          headerTitleStyle: {
            fontSize: 24,
            color: theme.colors.white,
          },
          headerStyle: { backgroundColor: theme.colors.Green500 },
        }}
      />
    </Stack>
  );
}
