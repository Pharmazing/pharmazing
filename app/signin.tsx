import { router } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";

export default function Page() {
  return (
    <>
      <Text>Sign in Page</Text>
      <Button title={"sign in"} onPress={() => router.replace("/home")} />
      <Button title={"sign up"} onPress={() => router.replace("/signup")} />
    </>
  );
}
