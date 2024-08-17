import { router, useSegments } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Text, Button, View, ImageBackground } from 'react-native';
import { styles } from '../src/utils/appStyles/styles';
import { isAndroid, isIOS, isWeb } from '../src/utils';
import { useSession, useUser } from '../src/utils/context';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
  useCreateUserMutation,
  useSignInLazyQuery,
} from '../src/generated/graphql';
import { LoadingIndicator } from '../src/components/atoms';

export default function Page() {
  const { loginAsGuest, session, loginWithGoogle, error } = useSession();
  const { updateUser, user } = useUser();
  const parsedSession = JSON.parse(session || '{}');

  const segments = useSegments();
  const isSecondarySignin = segments?.[0] === 'signin2';
  const showContinueAsGuest = segments?.[0] === 'signin' || isSecondarySignin;

  const [
    triggerSignIn,
    { data: signInData, error: signInError, loading: signInLoading },
  ] = useSignInLazyQuery();

  // handle onSuccess of sign up to nav to home
  const [
    triggerSignUp,
    { data: signUpData, error: signUpError, loading: signUpLoading },
  ] = useCreateUserMutation();

  if (signInData?.signIn && !user.userId) {
    const { userId, firstName, lastName, age, email, address } =
      signInData?.signIn;
    updateUser({
      userId,
      firstName,
      lastName,
      age,
      email,
      address: address || [],
    });
  }

  if (signUpData?.createUser) {
    const { userId, email, firstName, lastName, age, address } =
      signUpData?.createUser;
    updateUser({
      userId,
      firstName,
      lastName,
      age,
      email,
      address: address || [],
    });
  }

  useEffect(() => {
    try {
      if (parsedSession?.idToken) {
        if (!user?.userId) {
          triggerSignIn();
        } else {
          router.replace(isSecondarySignin ? '/signin2/setlocation' : '/home');
        }
      }
    } catch (e) {}
  }, [session, user]);

  useEffect(() => {
    if (signInError?.message === 'user not found' && !user.userId) {
      // create user record using current session data
      triggerSignUp({
        variables: {
          user: {
            email: user?.email || '',
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
          },
        },
      });
    }
  }, [signInError, user]);

  // check here to see if the issue s that this needs to be a memo or callback
  const Mobile = useCallback(() => {
    return (
      <View style={styles.container}>
        {/* <Spinner visible={(signInLoading) || (signUpLoading)} textContent={"Loading"} /> */}
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          // defaultSource={{ uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png` }}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png`,
          }}
        >
          <Text style={{ fontFamily: 'Roboto_700Bold_Italic' }}>
            Sign In Page
          </Text>
          <GoogleSigninButton onPress={loginWithGoogle} />
          {showContinueAsGuest && (
            <Button
              title={'Continue As Guest'}
              onPress={() => {
                loginAsGuest(isSecondarySignin);
                // Sentry.captureMessage("Continue As Guest");
              }}
            />
          )}
          <Button title={'sign up'} onPress={() => router.replace('/signup')} />
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

          <LoadingIndicator
            size="large"
            loading={signInLoading || signUpLoading}
          />
        </ImageBackground>
      </View>
    );
  }, [signInLoading, signUpLoading, error, signInError, signUpError]);

  const Web = () => (
    <>
      <Text>Sign In Page</Text>
      <GoogleSigninButton onPress={loginWithGoogle} />
      {showContinueAsGuest && (
        <Button
          title={'Continue As Guest'}
          onPress={() => {
            loginAsGuest(isSecondarySignin);
            // Sentry.captureMessage("Continue As Guest clicked");
            // throw new Error("Continue As Guest clicked");
          }}
        />
      )}
      <Button title={'sign up'} onPress={() => router.replace('/signup')} />
    </>
  );
  return (
    <>
      {(isIOS || isAndroid) && <Mobile />}
      {isWeb && <Web />}
    </>
  );
}
