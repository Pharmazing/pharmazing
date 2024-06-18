import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useSession } from "../src/utils/context";

export default function Page() {
  return (
    <View>
      <Text>Sign UP Page</Text>
      <Button
        title="Log in instead"
        onPress={() => router.replace("/signin")}
      />
    </View>
  );
}
