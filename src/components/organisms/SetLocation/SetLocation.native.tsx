import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Box, Icon, LoadingIndicator } from '../../atoms';
import { Button } from 'react-native';
import { PlacesAutocomplete } from '../../molecules';
import { EventProvider } from 'react-native-outside-press';
import { useStyles } from 'react-native-unistyles';
import {
  CreateAddressInput,
  CreateAddressMutation,
  useCreateAddressMutation,
} from '../../../generated/graphql';
import { AddressType, useUser } from '../../../utils/context';

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
  const { theme } = useStyles();
  const { userId: userIdParam, defaultData } = useLocalSearchParams();
  // console.log('userId', userIdParam);
  const [markerLocation, setMarker] = useState<Location | null>(null);
  const [addressQueryVars, setAddressQueryVars] =
    useState<CreateAddressInput | null>(null);
  const parsedDefaultData = JSON.parse((defaultData || '{}') as string);
  const mapRef = useRef<MapView | null>(null);
  const { user, addAddress } = useUser();

  const [
    triggerCreateAddress,
    { data, loading, error, called: createAddressCalled },
  ] = useCreateAddressMutation({
    onCompleted: (data: CreateAddressMutation) => {
      // console.log('data', data);
      const { __typename, ...rest } =
        data.createAddress as CreateAddressMutation;
      addAddress(rest as AddressType);
      router.replace('/home');
      // const { addressId, addressLine1, addressLine2, city, country, zip, parish, primary, latitude, longitude } = res;
    },
    onError: (error) => {
      console.log('error', error.message);
    },
  });

  const moveToLocation = (location: Location) => {
    location &&
      mapRef.current?.animateCamera(
        { center: location, zoom: 18 },
        { duration: 800 }
      );
  };

  const onLocationSubmit = async () => {
    // console.log('addressQueryVars', addressQueryVars);
    if (addressQueryVars) {
      if (user.userId)
        await triggerCreateAddress({
          variables: {
            userId: user.userId,
            address: { ...addressQueryVars, primary: true },
          },
        });
      // set current delivery location state and nav home // nav home for now
      if (!createAddressCalled) {
        // console.log('triggerCreateAddress.called', triggerCreateAddress);
        router.replace('/home');
      }
    }
  };

  const handleAutocompleteSelect = (point: AddressType | null | undefined) => {
    if (point?.latitude && point?.longitude) {
      const newLocation = {
        latitude: point.latitude,
        longitude: point.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setMarker(newLocation);
      moveToLocation(newLocation);
      setAddressQueryVars(point as CreateAddressInput);
      // console.log('point', point);
    }
  };

  const defaultRegion = {
    latitude: parsedDefaultData?.item?.latitude || initialRegion.latitude,
    longitude: parsedDefaultData?.item?.longitude || initialRegion.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  useEffect(() => {
    if (defaultData) {
      moveToLocation(defaultRegion);
      setMarker(defaultRegion);
    }
  }, [defaultData]);

  return (
    <EventProvider>
      <Box style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          initialRegion={initialRegion}
          onRegionChangeComplete={() =>
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
            >
              <Icon
                name="DeliveryBusIcon"
                color={theme.colors.Green500}
                height={28}
                width={28}
              />
            </Marker>
          )}
        </MapView>

        <Box style={{ position: 'absolute', width: '100%', padding: 8 }}>
          <PlacesAutocomplete
            placeholder="Find address"
            onSelect={handleAutocompleteSelect}
          />
          {markerLocation && (
            <Button title={'Continue'} onPress={onLocationSubmit} />
          )}
        </Box>
      </Box>
      <LoadingIndicator loading={loading} />
    </EventProvider>
  );
};
