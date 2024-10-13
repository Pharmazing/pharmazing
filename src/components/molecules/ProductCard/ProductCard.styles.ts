import { createStyleSheet } from 'react-native-unistyles';

export const productCardStyles = createStyleSheet((theme) => ({
  container: {
    minHeight: 128,
    width: '100%',
    flexGrow: 1,
    // borderWidth: 1,
    // overflow: 'hidden',
    // width: '100%',
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

    width: '40%',
    height: 128,
    borderRadius: theme.size.layout.lg,
    backgroundColor: theme.colors.Gray200,
    alignSelf: 'center',
    // height: '80%',
  },
  contentContainer: {
    display: 'flex',
    // paddingVertical: theme.size.layout.md,
    // borderWidth: 1,
    // borderColor: 'red',
    gap: theme.size.layout.xs,
    justifyContent: 'space-between',
    // flexGrow: 3,
    width: '60%',
    // flexShrink: 1,
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
