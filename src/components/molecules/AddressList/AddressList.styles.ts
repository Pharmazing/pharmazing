import { createStyleSheet } from 'react-native-unistyles';
import { isAndroid } from '../../../utils';

export const ITEM_HEIGHT = 75;

export const addressListStyles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    // flex: 1,
  },
  backTextWhite: {
    color: theme.colors.white,
  },
  addressRow: ({ isLast }) => ({
    marginBottom: !!isLast ? theme.size.layout.xl : 0,
    height: ITEM_HEIGHT,
  }),
  rowFrontContent: {
    gap: theme.size.layout.lg,
    height: '100%',
    width: '100%',
    padding: theme.size.layout.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFront: () => ({
    alignItems: 'center',
    backgroundColor: 'white',
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
  }),
  rowBack: () => ({
    alignItems: 'center',
    // backgroundColor: ",
    flex: 1,
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  }),
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    // backgroundColor: "blue",
    width: 25,
    paddingRight: 17,
  },
  // backRightBtnLeft: {
  //   backgroundColor: "blue",
  //   right: 75,
  // },
  backRightBtnRight: {
    backgroundColor: theme.colors.Red700,
    right: 0,
    // opacity: 0.8,
  },
  trash: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
}));
