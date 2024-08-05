import { createStyleSheet } from 'react-native-unistyles';

export const textInputStyles = createStyleSheet((theme) => ({
  container: {
    marginBottom: 24,
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.Green500,
    padding: 10,
    borderRadius: theme.size.layout.md,
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Roboto_400Regular',
  },
  label: {
    paddingLeft: 10,
    position: 'absolute',
    fontFamily: 'Roboto_500Medium',
    color: theme.colors.Gray800,
  },
}));
