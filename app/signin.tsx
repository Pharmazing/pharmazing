import { router, useSegments } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Text, Button, View, ImageBackground } from 'react-native';
import { styles as appStyles } from '../src/utils/appStyles/styles';
import { isAndroid, isIOS, isWeb } from '../src/utils';
import { useDeliveryLocation, useSession, useUser } from '../src/utils/context';
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
  useCreateUserMutation,
  useSignInLazyQuery,
} from '../src/generated/graphql';
import { LoadingIndicator } from '../src/components/atoms';
import { useStyles } from 'react-native-unistyles';
import { Login } from '../src/components';
import { EventProvider } from 'react-native-outside-press';

export default function Page() {
  const { loginAsGuest, session, error, method } = useSession();
  const { updateUser, user, address } = useUser();
  const parsedSession = JSON.parse(session || '{}');
  const { updateShippingAddress } = useDeliveryLocation();
  const { styles } = useStyles(appStyles);
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
          triggerSignIn({ variables: { method } });
        } else {
          // set the current delivery address to the primary address
          const primaryAddress =
            address?.find((a) => a.primary) || address?.[0] || null;
          if (primaryAddress?.addressId) {
            updateShippingAddress(primaryAddress);
          }
          router.replace(
            isSecondarySignin && !address?.length
              ? '/signin2/setlocation'
              : '/home'
          );
          // router.replace(isSecondarySignin ? '/signin2/setlocation' : '/home');
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
          method,
        },
      });
    }
  }, [signInError, user]);

  // check here to see if the issue s that this needs to be a memo or callback
  const Mobile = useCallback(() => {
    return (
      <EventProvider>
        <View style={[styles.container, { padding: 0 }]}>
          <ImageBackground
            resizeMode="cover"
            style={styles.backgroundImage}
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png`,
            }}
          >
            <Login />
            {/* {error && (
              <Text style={{ height: 200 }}>
                SessionError: {JSON.stringify(error)}
              </Text>
            )} */}

            <LoadingIndicator
              size="large"
              loading={signInLoading || signUpLoading}
            />
          </ImageBackground>
        </View>
      </EventProvider>
    );
  }, [signInLoading, signUpLoading, error, signInError, signUpError]);

  const Web = () => (
    <>
      <Text>Sign In Page</Text>
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
