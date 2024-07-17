import { Stack, useLocalSearchParams } from "expo-router";
import { Box } from "../../src/components/atoms";
import { Addresses } from "../../src/components/organisms";

export default function Page() {
  const { id } = useLocalSearchParams();
  return (
    <Box style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: `addresses for ${id}`,
          headerBackTitle: "Settings",
        }}
      />
      <Addresses />
    </Box>
  );
}
