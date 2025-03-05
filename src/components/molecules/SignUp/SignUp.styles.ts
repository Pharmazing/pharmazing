import { createStyleSheet } from 'react-native-unistyles';

export const signupStyles = createStyleSheet((theme) => ({
  container: {
    padding: theme.size.layout.lg,
    width: '100%',
    flexBasis: 'auto',
    // flexGrow: 0.6,
    justifyContent: 'center',
  },
  blurView: {
    // height: '100%',
    padding: theme.size.layout.lg,
    paddingVertical: theme.size.layout.xl,
    // backgroundColor: theme.colors.Blue00,
    overflow: 'hidden',
    borderRadius: theme.size.layout.xl,
    alignItems: 'center',
    // flex: 1,
    gap: 16,
  },
}));
