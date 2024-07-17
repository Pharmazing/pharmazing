import { Stack, useLocalSearchParams } from "expo-router";
import { Box } from "../../src/components/atoms";
import { Addresses } from "../../src/components/organisms";
import { isAndroid, isIOS } from "../../src/utils";

export default function Page() {
  const { id } = useLocalSearchParams();
  return (
    (isIOS || isAndroid) && (
      <Box style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerTitle: `addresses for ${id}`,
            headerBackTitle: "Settings",
          }}
        />
        <Addresses />
      </Box>
    )
  );
}
