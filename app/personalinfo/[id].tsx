import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollBox } from "../../src/components/atoms";
import { PersonalInfo } from "../../src/components/organisms/PersonalInfo/PersonalInfo";

export default function Page() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollBox style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: `details for ${id}`,
          headerBackTitle: "Settings",
        }}
      />
      <PersonalInfo />
    </ScrollBox>
  );
}
