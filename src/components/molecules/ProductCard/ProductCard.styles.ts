import { createStyleSheet } from 'react-native-unistyles';

export const productCardStyles = createStyleSheet((theme) => ({
  container: {
    // minHeight: 156,
    maxHeight: 256,
    width: '100%',
    // flexGrow: 1,
    borderRadius: theme.size.layout.lg + 4,
    gap: theme.size.layout.md,
    padding: theme.size.layout.md,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    borderRadius: theme.size.layout.lg,
  },
  imageContainer: {
    display: 'flex',
    width: { xs: 128, md: 256 },
    height: { xs: 128, md: 256 },
    borderRadius: theme.size.layout.lg + 4,
    backgroundColor: theme.colors.Gray200,
    alignSelf: 'center',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    gap: theme.size.layout.xs,
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    // elevation: 5,
  },
}));
