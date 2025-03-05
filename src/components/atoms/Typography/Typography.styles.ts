import { createStyleSheet } from 'react-native-unistyles';
import { TypographyProps } from './Typography.types';

const weightToFontFamily = (weight: TypographyProps['weight']) => {
  switch (weight) {
    case '100':
      return 'Roboto_100Thin';
    case '300':
      return 'Roboto_300Light';
    case '500':
      return 'Roboto_500Medium';
    case '700':
      return 'Roboto_700Bold';
    case '900':
      return 'Roboto_900Black';
    default:
      return 'Roboto_400Regular';
  }
};

export const typographyStyles = createStyleSheet((theme) => ({
  typography: ({
    size,
    weight,
    inverted,
  }: {
    weight: TypographyProps['weight'];
    size: TypographyProps['size'];
    inverted: TypographyProps['inverted'];
  }) => ({
    color: inverted
      ? theme.colors.FgDefaultInverted200
      : theme.colors.FgDefault,
    fontSize: theme.size.text[size || 'md'],
    fontFamily: weightToFontFamily(weight),
  }),
}));
