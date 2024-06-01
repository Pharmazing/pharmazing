import { Link, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { SessionProvider } from "../src/utils/context";

export default function RootLayout() {
  return (
    <SessionProvider>
      {(isIOS || isAndroid) && (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="signup"
            // options={{
            //   headerLeft: () => (
            //     <Link href="/signin">
            //       <Text>Back</Text>
            //     </Link>
            //   ),
            // }}
          />
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
                  <Text>Back to login</Text>
                </Link>
              ),
            }}
          />
          <Stack.Screen name="signin" options={{ headerShown: false }} />
        </Stack>
      )}
    </SessionProvider>
  );
}
