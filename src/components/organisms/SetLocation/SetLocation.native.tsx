import { router } from "expo-router";
import { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Box } from "../../atoms";
import { Button } from "react-native";

type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const SetLocation = () => {
  const [region, setRegion] = useState<Location>({
    latitude: 18.007784382364594,
    longitude: -76.77899130247651,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <Box style={{ flex: 1 }}>
      <MapView
        region={region}
        onRegionChange={setRegion}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
      />

      <Box style={{ position: "absolute", borderWidth: 1, width: "100%" }}>
        <Button title="Skip" onPress={() => router.replace("/home")} />
      </Box>
    </Box>
  );
};
