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
  bottomSheet: {
    display: 'flex',
    width: '100%',
    height: '40%',
    bottom: 0,
    borderTopLeftRadius: theme.size.layout.lg + 4,
    borderTopRightRadius: theme.size.layout.lg + 4,
    position: 'absolute',
    zIndex: 3,
    backgroundColor: theme.colors.Gray200,
    padding: theme.size.layout.lg,
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
}));
