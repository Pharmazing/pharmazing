import { Link, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { isAndroid, isIOS, isWeb } from "../src/utils";
import { SessionProvider } from "../src/utils/context";
// import { ApolloClient } from "@apollo/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function RootLayout() {
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}
