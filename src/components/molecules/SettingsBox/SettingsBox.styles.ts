import { createStyleSheet } from 'react-native-unistyles';
export const settingsBoxStyles = createStyleSheet((theme) => ({
  header: {
    fontFamily: 'Roboto_700Bold',
    fontSize: theme.size.text.xxl,
    marginBottom: theme.size.layout.md,
    color: theme.colors.Gray600,
  },
  container: {
    width: '100%',
    padding: theme.size.layout.lg,
    borderRadius: theme.size.layout.lg,
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
  },
}));
