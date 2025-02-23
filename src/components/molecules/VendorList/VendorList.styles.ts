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
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  vendorCardButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.BgDefault,
    borderRadius: theme.size.layout.xl - 2,
    padding: theme.size.layout.md,
    height: { xs: 128, lg: 248 },
    gap: theme.size.layout.md,
  },
  vendorCardContainer: {
    padding: 3,
    marginBottom: theme.size.layout.xl,
    borderRadius: theme.size.layout.xl,
  },
  vendorCardMediaContainer: {
    width: { xs: 120, lg: 240 },
    height: '100%',
  },
  vendorCardImage: {
    flex: 1,
    borderRadius: theme.size.layout.lg,
  },
  vendorCardTitle: {
    color: theme.colors.FgDefault,
  },
  vendorCardsubTitle: {
    color: theme.colors.Gray500,
  },
  writtenContent: { flex: 1, gap: theme.size.layout.md },
}));
