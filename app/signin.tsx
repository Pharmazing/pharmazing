import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, Button, View } from "react-native";
import { styles } from "../src/utils/appStyles/styles";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { useSession } from "../src/utils/context";

export default function Page() {
  const { signIn, session } = useSession();
  console.log(session);
  const login = () => {
    signIn(JSON.stringify({ user: "user" }));
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/home");
  };
  useEffect(() => {
    if (session) router.replace("/home");
  }, [session]);

  const Mobile = () => (
    <View style={styles.container}>
      <Text>Sign In Page</Text>
      <Button title={"sign in"} onPress={login} />
      <Button title={"sign up"} onPress={() => router.replace("/signup")} />
    </View>
  );
  const Web = () => (
    <>
      <Text>Sign In Page</Text>
      <Button title={"sign in"} onPress={login} />
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
