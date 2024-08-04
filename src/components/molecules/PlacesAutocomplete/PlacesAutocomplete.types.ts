import { Point } from 'react-native-google-places-autocomplete';

export type PlacesAutocompleteProps = {
  onSelect?: (details: Point | undefined | null) => void;
  placeholder?: string;
};
