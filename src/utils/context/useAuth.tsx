import React, { useState } from 'react';
import { isAndroid, isIOS, useStorageState } from '../hooks';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router, useNavigationContainerRef } from 'expo-router';
import { useUser } from './useUser';
import { StackActions } from '@react-navigation/native';
import { useDeliveryLocation } from './useDeliveryLocation';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, // change here in eas.json if results dont go as expected
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  // androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
});

const AuthContext = React.createContext<{
  loginAsGuest: (val?: boolean) => void;
  signOut: () => void;
  setSession: (value: string | null) => void;
  session?: string | null;
  isLoading: boolean;
  loginWithGoogle: () => void;
  error: any | null;
}>({
  signOut: () => null,
  loginAsGuest: () => null,
  session: null,
  isLoading: false,
  loginWithGoogle: () => null,
  error: null,
  setSession: () => null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [error, setError] = useState<any | null>(null);

  const { updateUser, clearUser } = useUser();
  const { clearDeliveryLocation } = useDeliveryLocation();
  const rootNav = useNavigationContainerRef();

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {
        user: gUser,
        idToken,
        scopes,
        ...rest
      } = await GoogleSignin.signIn();

      setSession(JSON.stringify({ idToken, scopes, ...rest }));

      updateUser({
        email: gUser.email,
        // userId: user.id,
        firstName: gUser.givenName,
        lastName: gUser.familyName,
        address: [],
      });
      setError(null);
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  const loginAsGuest = async (setLocation?: boolean) => {
    try {
      router.canGoBack() && rootNav.dispatch(StackActions.popToTop());
      router.replace(setLocation ? '/signin2/setlocation' : '/home');
      setError(null);
    } catch (e) {
      if (error instanceof Error) setError(e);
    }
  };

  const signOut = async () => {
    await GoogleSignin.signOut();
    setSession(null);
    setError(null);
    clearUser();
    clearDeliveryLocation();
    router.replace(isIOS || isAndroid ? '/signin2' : '/signin');
  };

  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        loginAsGuest,
        error,
        signOut,
        setSession,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
