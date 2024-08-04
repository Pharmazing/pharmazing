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
}: PlacesAutocompleteProps) => {
  const { styles } = useStyles(placesAutocompleteStyles);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  return (
    <Box style={styles.container}>
      <OutsidePressHandler onOutsidePress={() => ref.current?.blur?.()}>
        <GooglePlacesAutocomplete
          ref={ref}
          fetchDetails
          textInputProps={{pointerEvents: disabled ? 'none' : 'auto'}}
          styles={{
            textInput: styles.textInput({disabled}),
            listView: styles.listView,
          }}
          enablePoweredByContainer={false}
          placeholder={placeholder}
          onPress={(_data, details) => {
            onSelect?.(details?.geometry?.location);
          }}
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
