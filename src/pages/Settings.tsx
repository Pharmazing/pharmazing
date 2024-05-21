import { router } from "expo-router";
import { Button, Text } from "react-native";

export default function Settings() {
  return (
    <>
      <Text>Settings Page</Text>
      <Button title={"Sign out"} onPress={() => router.replace("signin")} />
    </>
  );
}
