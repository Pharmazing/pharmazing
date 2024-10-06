import { createStyleSheet } from 'react-native-unistyles';

export const vendorPageStyles = createStyleSheet((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    padding: theme.size.layout.md,
    flexDirection: 'column',
    gap: theme.size.layout.lg,
  },

  imageContainer: {
    height: 200,
  },
}));
