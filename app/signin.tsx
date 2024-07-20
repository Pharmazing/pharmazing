import { router, useSegments } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Text, Button, View, ImageBackground } from "react-native";
import { styles } from "../src/utils/appStyles/styles";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { useSession } from "../src/utils/context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import {
  useCreateUserMutation,
  useSignInLazyQuery,
} from "../src/generated/graphql";
import { LoadingIndicator } from "../src/components/atoms";

export default function Page() {
  const { loginAsGuest, session, loginWithGoogle, error, setSession } =
    useSession();
  const parsedSession = JSON.parse(session || "{}");

  const segments = useSegments();
  const showContinueAsGuest =
    segments?.[0] === "signin" || segments?.[0] === "signin2";
  const isSecondarySignin = segments?.[0] === "signin2";
  console.log("isSecondarySignin", isSecondarySignin);
  const [
    triggerSignIn,
    { data: signInData, error: signInError, loading: signInLoading },
  ] = useSignInLazyQuery();

  // handle onSuccess of sign up to nav to home
  const [
    triggerSignUp,
    { data: signUpData, error: signUpError, loading: signUpLoading },
  ] = useCreateUserMutation();

  if (signInData?.signIn) {
    const newSession = {
      ...parsedSession,
      user: {
        ...parsedSession.user,
        userId: signInData?.signIn?.userId,
        email: signInData?.signIn?.email,
        address: signInData?.signIn?.address,
        age: signInData?.signIn?.age,
        givenName: signInData?.signIn?.firstName,
        familyName: signInData?.signIn?.lastName,
      },
    };
    setSession(JSON.stringify(newSession));
  }

  if (signUpData?.createUser) {
    const newSession = {
      ...parsedSession,
      user: {
        ...parsedSession.user,
        userId: signUpData?.createUser?.userId,
        address: signUpData?.createUser?.address,
        age: signUpData?.createUser?.age,
        email: signUpData?.createUser?.email,
        givenName: signUpData?.createUser?.firstName,
        familyName: signUpData?.createUser?.lastName,
      },
    };
    setSession(JSON.stringify(newSession));
  }

  useEffect(() => {
    try {
      if (parsedSession?.user) {
        if (!parsedSession?.user?.userId) {
          triggerSignIn();
        } else {
          router.replace(isSecondarySignin ? "/signin2/setlocation" : "/home");
        }
      }
    } catch (e) {}
  }, [session]);

  useEffect(() => {
    if (signInError?.message === "user not found") {
      // create user record using current session data
      !parsedSession?.user?.userId &&
        triggerSignUp({
          variables: {
            user: {
              email: parsedSession?.user?.email,
              firstName: parsedSession?.user?.givenName,
              lastName: parsedSession?.user?.familyName,
            },
          },
        });
    }
  }, [signInError]);

  // check here to see if the issue s that this needs to be a memo or callback
  const Mobile = useCallback(() => {
    return (
      <View style={styles.container}>
        {/* <Spinner visible={(signInLoading) || (signUpLoading)} textContent={"Loading"} /> */}
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          // defaultSource={{ uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png` }}
          source={{ uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png` }}
        >
          <Text style={{ fontFamily: "Roboto_700Bold_Italic" }}>
            Sign In Page
          </Text>
          <GoogleSigninButton onPress={loginWithGoogle} />
          {showContinueAsGuest && (
            <Button
              title={"Continue As Guest"}
              onPress={() => loginAsGuest(isSecondarySignin)}
            />
          )}
          <Button title={"sign up"} onPress={() => router.replace("/signup")} />
          {error && (
            <Text style={{ height: 200 }}>
              SessionError: {JSON.stringify(error)}
            </Text>
          )}
          {signInError && (
            <Text style={{ height: 200 }}>
              SigninError: {JSON.stringify(signInError)}
            </Text>
          )}
          {signUpError && (
            <Text style={{ height: 200 }}>
              Error: {JSON.stringify(signUpError)}
            </Text>
          )}
       
            <LoadingIndicator size="large" color="#345ABB" loading={signInLoading || signUpLoading} />
          
        </ImageBackground>
      </View>
    );
  }, [signInLoading, signUpLoading, error, signInError, signUpError]);
  const Web = () => (
    <>
      <Text>Sign In Page</Text>
      <GoogleSigninButton onPress={loginWithGoogle} />
      {showContinueAsGuest && (
        <Button title={"Continue As Guest"} onPress={() => loginAsGuest()} />
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
