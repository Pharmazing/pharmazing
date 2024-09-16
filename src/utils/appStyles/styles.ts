import { createStyleSheet } from 'react-native-unistyles';

export const styles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    gap: theme.size.layout.md,
    padding: theme.size.layout.lg,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
