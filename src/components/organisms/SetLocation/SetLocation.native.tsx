import { router } from 'expo-router';
import { useState } from 'react';
import MapView from 'react-native-maps';
import { Box } from '../../atoms';
import { Button } from 'react-native';

type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const initialRegion = {
  latitude: 18.007784382364594,
  longitude: -76.77899130247651,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
// 18.007784382364594
// -76.77899130247651

export const SetLocation = () => {
  const [region, setRegion] = useState<Location>(initialRegion);

  return (
    <Box style={{ flex: 1 }}>
      <MapView
        initialRegion={initialRegion}
        region={region}
        onRegionChange={setRegion}
        style={{ flex: 1 }}
        // provider={isAndroid ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      />

      <Box style={{ position: 'absolute', borderWidth: 1, width: '100%' }}>
        <Button title="Skip" onPress={() => router.replace('/home')} />
      </Box>
    </Box>
  );
};
