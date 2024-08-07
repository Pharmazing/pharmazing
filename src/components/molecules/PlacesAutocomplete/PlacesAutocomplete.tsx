import { useStyles } from 'react-native-unistyles';
import { Box } from '../../atoms';
import { PlacesAutocompleteProps } from './PlacesAutocomplete.types';
import { placesAutocompleteStyles } from './PlacesAutocomplete.styles';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { useRef } from 'react';
import OutsidePressHandler from 'react-native-outside-press';

(navigator.geolocation as any) = require('@react-native-community/geolocation');

export const PlacesAutocomplete = ({
  onSelect,
  placeholder = 'Add new address',
  disabled = false,
  style,
}: PlacesAutocompleteProps) => {
  const { styles } = useStyles(placesAutocompleteStyles);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  return (
    <Box style={[styles.container, style]}>
      <OutsidePressHandler
        onOutsidePress={() =>
          ref.current?.isFocused() ? ref.current?.blur() : null
        }
      >
        <GooglePlacesAutocomplete
          ref={ref}
          fetchDetails
          styles={{
            listView: styles.listView,
            textInput: styles.textInput({ disabled }),
          }}
          enablePoweredByContainer={false}
          placeholder={placeholder}
          onPress={(data, details) => {
            onSelect?.(details?.geometry?.location);
            // console.log('data', data, details);
          }}
          minLength={3}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
            language: 'en',
            components: 'country:jm',
          }}
          currentLocation
          currentLocationLabel="Use current location"
        />
      </OutsidePressHandler>
    </Box>
  );
};
