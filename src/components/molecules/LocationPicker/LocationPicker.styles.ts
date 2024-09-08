import { createStyleSheet } from 'react-native-unistyles';

export const locationPickerStyles = createStyleSheet((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
  },
  label: {
    color: theme.colors.white,
  },
}));
