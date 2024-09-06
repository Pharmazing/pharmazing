import { useStyles } from 'react-native-unistyles';
import { Box } from '../../atoms';
import { PlacesAutocompleteProps } from './PlacesAutocomplete.types';
import { placesAutocompleteStyles } from './PlacesAutocomplete.styles';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { useRef } from 'react';
import OutsidePressHandler from 'react-native-outside-press';
import { AddressType } from '../../../utils/context';
import React from 'react';

(navigator.geolocation as any) = require('@react-native-community/geolocation');

export const PlacesAutocomplete = React.forwardRef<
  GooglePlacesAutocompleteRef,
  PlacesAutocompleteProps
>(({ onSelect, style, disabled, placeholder }, ref) => {
  const { styles } = useStyles(placesAutocompleteStyles);
  // const ref = useRef<GooglePlacesAutocompleteRef>(null);
  if (typeof ref === 'function') {
    return null;
  }
  const handleOutsidePress = () => {
    if (ref?.current?.isFocused()) {
      ref.current?.blur();
    }
  };

  const handleAutocompleteSelect = (
    _data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    const addressObj: AddressType = {};
    details?.address_components.forEach((item) => {
      const types = item.types;
      if (types.includes('street_number')) {
        addressObj.addressLine1 = item.long_name;
      } else if (types.includes('route')) {
        addressObj.addressLine1 =
          (addressObj.addressLine1 ? addressObj.addressLine1 + ' ' : '') +
          item.long_name;
      } else if (types.includes('locality')) {
        addressObj.city = item.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        let parish: string | string[] | undefined = item.long_name.split(' ');
        parish.pop();
        parish = parish.join(' ');
        addressObj.parish = parish;
        addressObj.zip = parish;
      } else if (types.includes('postal_code')) {
        addressObj.zip = item.long_name;
      } else if (types.includes('country')) {
        addressObj.country = item.long_name;
      }
    });
    onSelect?.({
      ...addressObj,
      latitude: details?.geometry?.location.lat,
      longitude: details?.geometry?.location.lng,
    });
  };
  return (
    <Box style={[styles.container, style]}>
      <OutsidePressHandler onOutsidePress={handleOutsidePress}>
        <GooglePlacesAutocomplete
          ref={ref}
          fetchDetails
          styles={{
            listView: styles.listView,
            textInput: styles.textInput({ disabled }),
          }}
          enablePoweredByContainer={false}
          placeholder={placeholder || 'Add new address'}
          onPress={handleAutocompleteSelect}
          minLength={3}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
            language: 'en',
            components: 'country:jm',
            types: ['address'],
          }}
          currentLocation
          currentLocationLabel="Use current location"
        />
      </OutsidePressHandler>
    </Box>
  );
});
