import { createStyleSheet } from 'react-native-unistyles';

export const productCardStyles = createStyleSheet((theme) => ({
  container: {
    height: 128,
    width: '100%',
    borderRadius: theme.size.layout.lg,
    borderWidth: 1,
    padding: theme.size.layout.md,
  },
}));
