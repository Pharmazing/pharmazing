import { createStyleSheet } from 'react-native-unistyles';

export const productCardStyles = createStyleSheet((theme) => ({
  container: {
    minHeight: 128,
    flexGrow: 1,
    // width: '100%',
    borderRadius: theme.size.layout.lg,

    gap: theme.size.layout.md,
    padding: theme.size.layout.md,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    borderRadius: theme.size.layout.lg,
  },
  imageContainer: {
    // width: '100%',
    flexGrow: 1,
    height: '100%',
    borderRadius: theme.size.layout.lg,
    backgroundColor: theme.colors.Gray200,
    alignSelf: 'center',
    // height: '80%',
  },
  contentContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexGrow: 1,
    flexShrink: 1,
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
