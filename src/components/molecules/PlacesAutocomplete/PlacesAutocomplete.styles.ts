import { createStyleSheet } from 'react-native-unistyles';

export const placesAutocompleteStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    margin: theme.size.layout.md,
  },
  textInput: ({disabled}: {disabled?: boolean}) => ({
    borderRadius: theme.size.layout.md,
    borderWidth: 2,
    borderColor: !!disabled ? theme.colors.Gray200 : theme.colors.Green400,
  }),
  listView: {
    borderRadius: theme.size.layout.md,
  },
}));
