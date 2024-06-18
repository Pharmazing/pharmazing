import React, { useEffect, useState } from "react";
import { useStorageState } from "../hooks";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

const AuthContext = React.createContext<{
  loginAsGuest: () => void;
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
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [error, setError] = useState<any | null>(null);
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, // change here in eas.json if results dont go as expected
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      // androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    });
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setSession(JSON.stringify(userInfo));
      setError(null);
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  const loginAsGuest = async () => {
    try {
      router.replace("/home");
      setError(null);
    } catch (e) {
      if (error instanceof Error) setError(e);
    }
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        loginAsGuest,
        error,
        signOut: () => {
          if (GoogleSignin.hasPreviousSignIn()) GoogleSignin.signOut();
          setSession(null);
        },
        setSession,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
