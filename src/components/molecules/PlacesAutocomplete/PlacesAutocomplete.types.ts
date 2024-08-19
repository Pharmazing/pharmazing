import { StyleProp, ViewStyle } from 'react-native';
import { AddressType } from '../../../utils/context';
import { GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';

export type PlacesAutocompleteProps = {
  onSelect?: (details: AddressType | undefined | null) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
