import { createStyleSheet } from 'react-native-unistyles';
import * as Constants from 'expo-constants';
export const locationPickerHeaderStyles = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.Blue500,
    height: {
      xs: 64,
      sm: 72,
      md: 80,
      lg: 88,
      xl: 96,
    },
    paddingLeft: 16,
    paddingRight: 16,
    // width: ,
    marginTop: Constants.default.statusBarHeight,
    // margin: Constants.default.statusBarHeight,
    // borderWidth: 2,
  },
}));
