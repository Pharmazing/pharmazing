import { createStyleSheet } from 'react-native-unistyles';

export const placesAutocompleteStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  textInput: ({ disabled }: { disabled?: boolean }) => ({
    borderRadius: theme.size.layout.md,
    borderWidth: 2,
    borderColor: disabled ? theme.colors.Gray200 : theme.colors.Green400,
    pointerEvents: disabled ? 'none' : 'auto',
  }),
  listView: {
    borderRadius: theme.size.layout.md,
    borderWidth: 2,
    borderColor: theme.colors.Gray200,
  },
}));
