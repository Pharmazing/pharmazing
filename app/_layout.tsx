import { Stack } from "expo-router";
import React from "react";
import { isAndroid, isIOS, isWeb } from "../src/utils";

export default function RootLayout() {
  return (
    <>
      {(isIOS || isAndroid) && (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      )}
      {isWeb && (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      )}
    </>
  );
}
