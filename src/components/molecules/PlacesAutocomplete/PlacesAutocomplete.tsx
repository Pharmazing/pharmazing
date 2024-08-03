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
// navigator.geolocation = require('@react-native-community/geolocation');
(navigator.geolocation as any) = require('@react-native-community/geolocation');
export const PlacesAutocomplete = (props: PlacesAutocompleteProps) => {
  console.log('PlacesAutocomplete', props);
  const { styles } = useStyles(placesAutocompleteStyles);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  return (
    <Box style={styles.container}>
      <OutsidePressHandler onOutsidePress={() => ref.current?.blur?.()}>
        <GooglePlacesAutocomplete
          ref={ref}
          styles={{
            textInputContainer: styles.textInputContainer,
            container: { backgroundColor: 'white' },
          }}
          enablePoweredByContainer={false}
          placeholder="Add new address"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
          currentLocation
          currentLocationLabel="Current location"
        />
      </OutsidePressHandler>
    </Box>
  );
};
