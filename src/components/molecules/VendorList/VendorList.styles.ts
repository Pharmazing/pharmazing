import { createStyleSheet } from 'react-native-unistyles';

export const vendorListStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  vendorCardContainer: {
    height: 128,
    borderWidth: 3,
    borderColor: theme.colors.Green500,
    marginBottom: theme.size.layout.xl,
    padding: theme.size.layout.md,
    borderRadius: theme.size.layout.xl,
    backgroundColor: 'transparent',
  },
}));
