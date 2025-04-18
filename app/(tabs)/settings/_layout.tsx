import { router, Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import { Icon } from '../../../src/components';
import { LinearGradient } from 'expo-linear-gradient';

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
              color={theme.colors.FgDefaultInverted}
              height={36}
              width={36}
              onPress={() => router.back()}
            />
          ),
          headerTitle: 'Prescriptions',
          headerBackTitle: 'Settings',
          headerTitleStyle: {
            fontSize: 24,
            color: theme.colors.FgDefaultInverted,
          },
          headerBackground: () => (
            <LinearGradient
              colors={[theme.colors.Blue400, theme.colors.Green400]}
              start={[0, 0]}
              end={[1, 1]}
              style={{ flex: 1 }}
            />
          ),
        }}
      />
    </Stack>
  );
}
