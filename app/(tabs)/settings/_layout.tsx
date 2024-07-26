import { Stack } from "expo-router";
import { useStyles } from "react-native-unistyles";

export default function Layout() {
  const { theme } = useStyles();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.tabsContentBg },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="prescriptions"
        options={{ headerBackTitle: "Settings" }}
      />
    </Stack>
  );
}
