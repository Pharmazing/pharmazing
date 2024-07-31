import { createStyleSheet } from 'react-native-unistyles';

export const loadingStyles = createStyleSheet((theme) => ({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // flex: 1,
    // zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.loadingBackground,
    opacity: 0.8,
  },
}));
