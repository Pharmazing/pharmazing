import { router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Page() {
  return (
    <View>
      <Text>Choose Location</Text>
      <Button title="Skip" onPress={() => router.replace("/home")} />
    </View>
  );
}
