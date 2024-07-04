import { router, useSegments } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  Text,
  Button,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { styles } from "../src/utils/appStyles/styles";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { useSession } from "../src/utils/context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
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
  const [triggerSignIn, { error: signInError, loading: signInLoading }] =
    useSignInLazyQuery({
      onCompleted: (data) => onSigninSuccess(data),
    });

  // handle onSuccess of sign up to nav to home
  const [triggerSignUp, { error: signUpError, loading: signUpLoading }] =
    useCreateUserMutation({
      onCompleted: (data) => onSignupSuccess(data),
    });
  const onSigninSuccess = async (data: any) => {
    if (data?.signIn) {
      const newSession = {
        ...parsedSession,
        user: {
          ...parsedSession.user,
          userId: data?.signIn?.userId,
          address: data?.signIn?.address,
          age: data?.signIn?.age,
        },
      };
      setSession(JSON.stringify(newSession));
    }
  };

  const onSignupSuccess = async (data: any) => {
    if (data?.createUser) {
      const newSession = {
        ...parsedSession,
        user: {
          ...parsedSession.user,
          userId: data?.createUser?.userId,
          address: data?.createUser?.address,
          age: data?.createUser?.age,
        },
      };
      setSession(JSON.stringify(newSession));
    }
  };

  // useEffectOnce(() => {
  //   const signUpFn = async () => {
  //     if (parsedSession?.user) {
  //       // setSent(true);
  //       await triggerSignUp({
  //         variables: {
  //           user: {
  //             email: parsedSession?.user?.email,
  //             firstName: parsedSession?.user?.givenName,
  //             lastName: parsedSession?.user?.familyName,
  //             // picture: parsedSession?.picture,
  //           },
  //         },
  //       }).catch((e) => console.log(e));
  //     }
  //   };
  //   const signInFn = async () => {
  //     await triggerSignIn();
  //   }
  //   try{
  //     // await new Promise((resolve) => setTimeout(resolve, 2000));
  //     if (session && !signInError) {
  //       console.log("signing in");
  //       signInFn();
  //     }
  //     if (signInError?.message === "user not found" && !signUpError) {
  //       // create user record using current session data
  //       console.log("sign in error", signInError?.message);
  //       signUpFn();
  //     }
  //   }catch(e){
  //     console.log(e)
  //   }
  // }, [session, signInError]);

  // useEffect(() => {
  //   const parsedError = JSON.stringify(signInError || {});

  //   const jsonError = JSON.parse(parsedError);

  //   if (jsonError?.originalError?.message.includes("Token used too late")){
  //     GoogleSignin.signInSilently().then(userInfo => {
  //       setSession(JSON.stringify(userInfo));
  //     });
  //   }
  // }, [signInError]);

  useEffect(() => {
    try {
      if (parsedSession?.user) {
        if (!parsedSession?.user?.userId) {
          triggerSignIn();
        } else {
          router.replace("/home");
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
            <Button title={"Continue As Guest"} onPress={loginAsGuest} />
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
          {(signInLoading || signUpLoading) && (
            <View style={styles.loading}>
              <ActivityIndicator color="#345ABB" size="large" />
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }, [signInLoading, signUpLoading, error, signInError, signUpError]);
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
