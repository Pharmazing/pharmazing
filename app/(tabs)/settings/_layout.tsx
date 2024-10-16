import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

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
        options={{ headerBackTitle: 'Settings' }}
      />
    </Stack>
  );
}
