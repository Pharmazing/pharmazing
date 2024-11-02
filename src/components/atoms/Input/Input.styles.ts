import { createStyleSheet } from 'react-native-unistyles';

export const textInputStyles = createStyleSheet((theme) => ({
  container: {
    marginBottom: 24,
    marginHorizontal: 10,
  },
  input: ({ textColor }: { textColor?: string }) => ({
    color: textColor || theme.colors.Gray800,
    borderWidth: 2,
    borderColor: theme.colors.Green500,
    padding: 10,
    borderRadius: theme.size.layout.md,
    fontSize: theme.size.text.md,
    fontFamily: 'Roboto_400Regular',
  }),
  label: ({ textColor }: { textColor?: string }) => ({
    paddingLeft: 10,
    position: 'absolute',
    fontFamily: 'Roboto_500Medium',
    color: textColor || theme.colors.Gray800,
  }),
}));
