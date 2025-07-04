import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  Box,
  Button,
  ButtonVariantEnum,
  Icon,
  LoadingIndicator,
} from '../../atoms';
// import { Button } from 'react-native';
import { PlacesAutocomplete } from '../../molecules';
import { EventProvider } from 'react-native-outside-press';
import { UnistylesRuntime, useStyles } from 'react-native-unistyles';
import {
  CreateAddressInput,
  CreateAddressMutation,
  EditAddressInput,
  EditAddressMutation,
  useCreateAddressMutation,
  useEditAddressMutation,
} from '../../../generated/graphql';
import {
  AddressType,
  useDeliveryLocation,
  useUser,
} from '../../../utils/context';
import { GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { useToast } from '../../../utils';

const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  // ... other style configurations for roads, water, etc.
];

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
  const { updateShippingAddress, shippingAddress } = useDeliveryLocation();
  const { showToast } = useToast();
  // console.log('shippingAddress', shippingAddress);

  const [markerLocation, setMarker] = useState<Location | null>(null);
  const [addressQueryVars, setAddressQueryVars] = useState<
    CreateAddressInput | EditAddressInput | null
  >(null);
  const parsedDefaultData = JSON.parse((defaultData || '{}') as string);
  const mapRef = useRef<MapView | null>(null);
  const autocompleteRef = useRef<GooglePlacesAutocompleteRef>(null);
  const { user, addAddress, updateAddress } = useUser();

  const [triggerCreateAddress, { data, loading, error }] =
    useCreateAddressMutation({
      onCompleted: (data: CreateAddressMutation) => {
        const { __typename, ...rest } =
          data.createAddress as CreateAddressMutation;
        addAddress(rest as AddressType);
        updateShippingAddress(rest as AddressType);
        showToast({
          type: 'success',
          text1: 'Success',
          text2: 'Address added successfully',
        });
        router.replace('/home');
      },
      onError: () => {
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Address add failed',
        });
      },
    });

  const [triggerEditAddress, { loading: editAddyLoading }] =
    useEditAddressMutation({
      onCompleted: (data) => {
        const { __typename, ...rest } = data.editAddress as EditAddressMutation;
        updateAddress(rest as AddressType);
        showToast({
          type: 'success',
          text1: 'Success',
          text2: 'Address edited successfully',
        });
        router.back();
      },
      onError: (error) => {
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Address edit failed',
        });
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
    if (addressQueryVars) {
      if (user.userId && !userIdParam)
        await triggerCreateAddress({
          variables: {
            userId: user.userId,
            address: {
              ...addressQueryVars,
              primary: defaultData ? parsedDefaultData?.item?.primary : true,
            } as CreateAddressInput,
          },
        });
      // set current delivery location state and nav home // nav home for now
      if (userIdParam) {
        await triggerEditAddress({
          variables: {
            userId: userIdParam as string,
            address: {
              ...addressQueryVars,
              addressId: parsedDefaultData?.item.addressId,
              primary: defaultData ? parsedDefaultData?.item?.primary : true,
            } as EditAddressInput,
          },
        });
      }
      if (!user.userId && !userIdParam) {
        updateShippingAddress(addressQueryVars as AddressType);
        router.replace('/home');
      }
    } else {
      router.replace('/home');
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
    } else {
      setMarker(null);
      setAddressQueryVars(null);
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

  // const showContinueBtn = defaultData
  //   ? Boolean(autocompleteRef.current?.getAddressText())
  //   : !!markerLocation;

  return (
    <EventProvider>
      <Box style={{ flex: 1 }}>
        <MapView
          tintColor="dark"
          ref={mapRef}
          initialRegion={initialRegion}
          onRegionChangeComplete={() =>
            markerLocation && moveToLocation(markerLocation)
          }
          style={{ flex: 1 }}
          customMapStyle={
            UnistylesRuntime.themeName === 'light' ? undefined : darkMapStyle
          }
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
            ref={autocompleteRef}
            placeholder="Find address"
            onSelect={handleAutocompleteSelect}
          />
          {
            <Button
              textStyle={{ color: 'white' }}
              style={{ alignSelf: 'center' }}
              btnVariant={ButtonVariantEnum.SECONDARY}
              title={!markerLocation ? 'Skip' : 'Continue'}
              onPress={onLocationSubmit}
            />
          }
        </Box>
      </Box>
      <LoadingIndicator loading={loading || editAddyLoading} />
    </EventProvider>
  );
};
