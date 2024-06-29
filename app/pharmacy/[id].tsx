import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen
        options={{ headerTitle: `Details for ${id}`, headerBackTitle: "Home" }}
      />
    </View>
  );
}
