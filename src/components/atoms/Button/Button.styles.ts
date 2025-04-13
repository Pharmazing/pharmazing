import { createStyleSheet } from 'react-native-unistyles';

export const buttonStyles = createStyleSheet((theme) => ({
  primary: {
    borderRadius: 24,
    backgroundColor: theme.colors.Green500,
    height: 48,
    margin: 16,
    width: { xs: 200, sm: 220, md: 240, lg: 260, xl: 280 },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  secondary: {
    borderRadius: 24,
    backgroundColor: `${theme.colors.Green500}70`,
    height: 48,
    margin: 16,
    width: { xs: 200, sm: 220, md: 240, lg: 260, xl: 280 },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  danger: {
    borderRadius: 24,
    backgroundColor: theme.colors.Red700,
    height: 48,
    margin: 16,
    width: { xs: 200, sm: 220, md: 240, lg: 260, xl: 280 },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Roboto_700Bold',
    color: theme.colors.FgDefault,
  },
  shadow: ({
    shadowRadius,
    renderShadow,
  }: {
    shadowRadius?: number;
    renderShadow?: boolean;
  }) =>
    !renderShadow
      ? {}
      : {
          shadowColor: theme.colors.black,
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.35,
          shadowRadius: shadowRadius ?? 8,
          // elevation: 5,
        },
}));
