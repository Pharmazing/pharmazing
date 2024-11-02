import { createStyleSheet } from 'react-native-unistyles';

export const loginStyles = createStyleSheet((theme) => ({
  container: {
    padding: theme.size.layout.lg,
    width: '100%',
    height: 400,
  },
  blurView: {
    padding: theme.size.layout.lg,
    paddingVertical: theme.size.layout.xl,
    // backgroundColor: theme.colors.Blue00,
    overflow: 'hidden',
    borderRadius: theme.size.layout.xl,
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  providerButton: {
    backgroundColor: theme.colors.white,
    padding: 4,
    borderRadius: 50,
    // height: 36,
    // width: 36,
  },
}));
