import { createStyleSheet } from 'react-native-unistyles';

export const locationPickerStyles = createStyleSheet((theme) => ({
  container: {
    display: 'flex',
    // width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
  },
}));
