import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

export default function Page() {
  return (
    <View>
      <Text>Sign UP Page</Text>
      <Button
        title="Back to sign in"
        onPress={() => router.replace("/signin")}
      />
    </View>
  );
}
