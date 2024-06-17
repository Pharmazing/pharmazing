import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, Button, View, ImageBackground } from "react-native";
import { styles } from "../src/utils/appStyles/styles";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { useSession } from "../src/utils/context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

export default function Page() {
  const { loginAsGuest, session, loginWithGoogle, error } = useSession();

  useEffect(() => {
    if (session) router.replace("/home");
  }, [session]);

  const Mobile = () => (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        source={{ uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png` }}
      >
        <Text>Sign In Page</Text>
        <GoogleSigninButton onPress={loginWithGoogle} />
        <Button title={"Continue As Guest"} onPress={loginAsGuest} />
        <Button title={"sign up"} onPress={() => router.replace("/signup")} />
        {error && (
          <Text style={{ height: 500 }}>Error: {JSON.stringify(error)}</Text>
        )}
      </ImageBackground>
    </View>
  );
  const Web = () => (
    <>
      <Text>Sign In Page</Text>
      <GoogleSigninButton onPress={loginWithGoogle} />
      <Button title={"Contnue As Guest"} onPress={loginAsGuest} />
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
