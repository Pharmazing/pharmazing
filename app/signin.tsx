import { router } from "expo-router";
import React from "react";
import { Text, Button, View } from "react-native";
import { styles } from "../src/utils/appStyles/styles";
import { isAndroid, isIOS, isWeb } from "../src/utils";

export default function Page() {
  const Mobile = () => (
    <View style={styles.container}>
      <Text>Sign In Page</Text>
      <Button title={"sign in"} onPress={() => router.replace("/home")} />
      <Button title={"sign up"} onPress={() => router.replace("/signup")} />
    </View>
  );
  const Web = () => (
    <>
      <Text>Sign In Page</Text>
      <Button title={"sign in"} onPress={() => router.replace("/home")} />
      <Button title={"sign up"} onPress={() => router.replace("/signup")} />
    </>
  );
  return (
    <>
      {(isIOS || isAndroid) && <Mobile />}
      {isWeb && <Web />}
    </>
  );
}
