import { createStyleSheet } from 'react-native-unistyles';

export const customInputStyles = createStyleSheet((theme) => ({
  input: ({ textColor }: { textColor?: string }) => ({
    color: textColor || theme.colors.Blue900,
    backgroundColor: theme.colors.Gray150,
    height: {
      xs: 40,
    },
    borderRadius: theme.size.layout.lg,
    paddingHorizontal: theme.size.layout.md,
  }),
}));
