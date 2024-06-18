import { router, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Text, Button, View, ImageBackground } from "react-native";
import { styles } from "../src/utils/appStyles/styles";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { useSession } from "../src/utils/context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import Spinner from "react-native-loading-spinner-overlay";
import {
  useCreateUserMutation,
  useSignInLazyQuery,
} from "../src/generated/graphql";

export default function Page() {
  const { loginAsGuest, session, loginWithGoogle, error, setSession } =
    useSession();
  const parsedSession = JSON.parse(session || "{}");
  const segments = useSegments();
  const showContinueAsGuest = segments?.[0] === "signin";
  const [
    triggerSignIn,
    { data: signinResponse, loading: signInLoading, error: signInError },
  ] = useSignInLazyQuery({ onCompleted: (data) => onSuccess(data) });

  // handle onSuccess of sign up to nav to home
  const [
    triggerSignUp,
    { data: signUpResponse, loading: signUpLoading, error: signUpError },
  ] = useCreateUserMutation({ onCompleted: (data) => onSuccess(data) });
  const onSuccess = (data: any) => {
    console.log("data", data);
    if (data?.createUser || data?.signIn) {
      // set session
      console.log("session", parsedSession);
      const newSession = {
        ...parsedSession,
        user: {
          ...parsedSession.user,
          userId: data?.createUser?.userId || data?.signIn?.userId,
          address: data?.createUser?.address || data?.signIn?.address,
          age: data?.createUser?.age || data?.signIn?.age,
        },
      };
      setSession(JSON.stringify(newSession));
      console.log("data", data);
      // const
    }
    // sign in and create user response should be similiar so extract data to set session
    router.replace("/home");
  };
  const signUpFn = () => {
    if (parsedSession?.user) {
      triggerSignUp({
        variables: {
          user: {
            email: parsedSession?.user?.email,
            firstName: parsedSession?.user?.givenName,
            lastName: parsedSession?.user?.familyName,
            // picture: parsedSession?.picture,
          },
        },
      });
    }
  };
  useEffect(() => {
    if (session && !signInError) {
      triggerSignIn();
    }
    if (signInError?.message === "user not found") {
      // create user record using current session data
      console.log("sign in error", signInError?.message);
      signUpFn();
    }
  }, [session, signInError]);

  const Mobile = () => (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        source={{ uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png` }}
      >
        <Spinner
          visible={signInLoading || signUpLoading}
          textContent="Loading"
        />
        <Text>Sign In Page</Text>
        <GoogleSigninButton onPress={loginWithGoogle} />
        {showContinueAsGuest && (
          <Button title={"Continue As Guest"} onPress={loginAsGuest} />
        )}
        <Button title={"sign up"} onPress={() => router.replace("/signup")} />
        {error && (
          <Text style={{ height: 200 }}>Error: {JSON.stringify(error)}</Text>
        )}
        {signInError && (
          <Text style={{ height: 200 }}>
            Error: {JSON.stringify(signInError)}
          </Text>
        )}
        {signUpError && (
          <Text style={{ height: 200 }}>
            Error: {JSON.stringify(signUpError)}
          </Text>
        )}
      </ImageBackground>
    </View>
  );
  const Web = () => (
    <>
      <Text>Sign In Page</Text>
      <GoogleSigninButton onPress={loginWithGoogle} />
      {showContinueAsGuest && (
        <Button title={"Continue As Guest"} onPress={loginAsGuest} />
      )}
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
