import { createStyleSheet } from 'react-native-unistyles';

export const placesAutocompleteStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    zIndex: 1,
    position: 'relative',
    // borderWidth: 1,
    // borderColor: 'red',
    borderBottomColor: theme.colors.Blue500,
    borderBottomWidth: 1,
  },
  textInputContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    backgroundColor: 'white',
  },
}));
