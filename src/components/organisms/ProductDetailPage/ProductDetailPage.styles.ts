import { createStyleSheet } from 'react-native-unistyles';

export const productDetailPageStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  addToCartButton: ({ width }: { width: number }) => ({
    width: { xs: width },
    // borderWidth: 3,
    gap: theme.size.layout.md,
    margin: 0,
  }),
  bottomSheet: {
    display: 'flex',
    width: '100%',
    maxHeight: '65%',
    gap: theme.size.layout.lg,
    justifyContent: 'space-between',
    bottom: 0,
    borderTopLeftRadius: theme.size.layout.lg + 4,
    borderTopRightRadius: theme.size.layout.lg + 4,
    position: 'absolute',
    zIndex: 3,
    backgroundColor: theme.colors.Gray100,
    padding: theme.size.layout.lg,
    paddingBottom: theme.size.layout.xxl,
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
}));
