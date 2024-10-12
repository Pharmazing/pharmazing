import { createStyleSheet } from 'react-native-unistyles';

export const productListStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    gap: theme.size.layout.lg,
    paddingBottom: theme.size.layout.lg,
    paddingHorizontal: theme.size.layout.lg,
  },
}));
