import { Link, Stack } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { SessionProvider } from "../src/utils/context";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/utils/api/apollo/apolloClient";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";
// import { useFonts } from 'expo-font';
// import * as Font from "expo-font";
import "expo-dev-client";
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

  console.log(loaded);
  console.log(fontsErr);

  // if (!loaded){
  //   return null;
  // }
  // useEffect(() => {
  //   const getFonts = async () => {
  //     try {
  //       await Font.loadAsync({
  //         'RobotoRegular': {uri: '../assets/fonts/Roboto/RobotoRegular.ttf'},
  //       });

  //     }catch (err){
  //       console.log(err);
  //     }
  //   };
  //   getFonts();
  // }, []);
  return (
    <TamaguiProvider config={tamaguiConfig}>
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
    </TamaguiProvider>
  );
}
