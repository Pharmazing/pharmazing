import { createStyleSheet } from 'react-native-unistyles';

export const slidingButtonStyles = createStyleSheet((theme) => ({
  underlayStyle: {
    backgroundColor: theme.colors.Green200,
    // borderWidth: 1,
    padding: 20,
  },
  containerStyle: {
    width: '80%',
    backgroundColor: theme.colors.Green500,
    // borderWidth: 1,
    padding: 6,
  },
  thumbStyle: {
    // height: 36,
    // width: 36,
  },
}));
