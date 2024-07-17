import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Box, ScrollBox } from "../../src/components/atoms";
import { PersonalInfo } from "../../src/components/organisms";
import { isAndroid, isIOS } from "../../src/utils";
import { EventProvider } from "react-native-outside-press";
export default function Page() {
  const { id } = useLocalSearchParams();

  return (
    (isIOS || isAndroid) && (
      <EventProvider>
        <Box style={{ flex: 1 }}>
          <Stack.Screen
            options={{
              headerTitle: `details for ${id}`,
              headerBackTitle: "Settings",
            }}
          />
          <PersonalInfo />
        </Box>
      </EventProvider>
    )
  );
}
