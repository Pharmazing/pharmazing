import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Box } from "../../src/components/atoms";

export default function Page() {
  const { id } = useLocalSearchParams();

  return (
    <Box>
      <Stack.Screen
        options={{
          headerTitle: `details for ${id}`,
          headerBackTitle: "Settings",
        }}
      />
    </Box>
  );
}
