import React, { useEffect, useState } from "react";
import { useStorageState } from "../hooks";
// import { Text } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = React.createContext<{
  signIn: (data?: any) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  loginWithGoogle?: () => void;
  error: any | null;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  loginWithGoogle: () => null,
  error: null,
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
  console.log("errpr", JSON.stringify(error));
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
      // if (loadingRef.current)
      //   throw new Error("Google One-tap script is still loading");
      const userInfo = await GoogleSignin.signIn();
      setSession(JSON.stringify(userInfo));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);
  // if (loadingRef.current) {
  //   return <Text>...Loading</Text>;
  // }
  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        error,
        signIn: (data: any) => {
          // Perform sign-in logic here
          setSession(data || "xxx");
        },
        signOut: () => {
          GoogleSignin.signOut();
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
