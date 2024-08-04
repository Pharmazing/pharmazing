import { createStyleSheet } from 'react-native-unistyles';

export const placesAutocompleteStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
    margin: theme.size.layout.md,
  },
  textInput: {
    borderRadius: theme.size.layout.md,
    borderWidth: 2,
    borderColor: theme.colors.Green400,
  },
  listView: {
    borderRadius: theme.size.layout.md,
  },
}));
