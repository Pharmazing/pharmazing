import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Box } from '../../atoms';
import { Button } from 'react-native';
import { PlacesAutocomplete } from '../../molecules';
import { EventProvider } from 'react-native-outside-press';

type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const initialRegion = {
  latitude: 18.007784382364594,
  longitude: -76.77899130247651,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

export const SetLocation = () => {
  const [markerLocation, setMarker] = useState<Location | null>(null);

  const mapRef = useRef<MapView | null>(null);
  const moveToLocation = (location: Location) => {
    location &&
      mapRef.current?.animateCamera(
        { center: location, zoom: 18 },
        { duration: 800 }
      );
  };

  const onLocationSubmit = () => {
    router.replace('/home');
  };

  return (
    <EventProvider>
      <Box style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          initialRegion={initialRegion}
          // region={region}
          onRegionChangeComplete={(region) =>
            markerLocation && moveToLocation(markerLocation)
          }
          style={{ flex: 1 }}
          showsUserLocation
          showsMyLocationButton
          provider={PROVIDER_GOOGLE}
        >
          {markerLocation && (
            <Marker
              coordinate={{
                latitude: markerLocation.latitude,
                longitude: markerLocation.longitude,
              }}
              title="You are here"
              description="delivery location"
            />
          )}
        </MapView>

        <Box style={{ position: 'absolute', width: '100%' }}>
          <PlacesAutocomplete
            placeholder="Find address"
            onSelect={(point) => {
              if (point) {
                const newLocation = {
                  latitude: point.lat,
                  longitude: point.lng,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                };
                setMarker(newLocation);
                moveToLocation(newLocation);
              }
            }}
          />
          {markerLocation && (
            <Button title={'Continue'} onPress={onLocationSubmit} />
          )}
        </Box>
      </Box>
    </EventProvider>
  );
};
