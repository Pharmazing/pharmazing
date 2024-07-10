import { Link, Stack } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { SessionProvider } from "../src/utils/context";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/utils/api/apollo/apolloClient";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";
import "expo-dev-client";
import "../src/utils/unistyles/unistyles";

import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { Theme } from "tamagui";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, fontsErr] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  useEffect(() => {
    if (loaded || fontsErr) {
      SplashScreen.hideAsync();
    }
  }, [loaded, fontsErr]);

  if (!loaded && !fontsErr) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <SessionProvider>
          <ApolloProvider client={client}>
            {(isIOS || isAndroid) && (
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="signup" />
                <Stack.Screen name="signin" options={{ headerShown: false }} />
              </Stack>
            )}
            {isWeb && (
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="signup"
                  options={{
                    headerLeft: () => (
                      <Link href="/signin">
                        <Text style={{ fontFamily: "RobotoRegular" }}>
                          Back to login
                        </Text>
                      </Link>
                    ),
                  }}
                />
                <Stack.Screen name="signin" options={{ headerShown: false }} />
              </Stack>
            )}
          </ApolloProvider>
        </SessionProvider>
      </Theme>
    </TamaguiProvider>
  );
}
