import { Link, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { SessionProvider } from "../src/utils/context";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/utils/api/apollo/apolloClient";

export default function RootLayout() {
  return (
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
                    <Text>Back to login</Text>
                  </Link>
                ),
              }}
            />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
          </Stack>
        )}
      </ApolloProvider>
    </SessionProvider>
  );
}
