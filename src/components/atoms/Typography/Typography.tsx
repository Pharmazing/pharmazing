import { Text } from 'react-native';
import { TypographyProps } from './Typography.types';
import { useStyles } from 'react-native-unistyles';
import { typographyStyles } from './Typography.styles';

export const Typography = ({
  style,
  children,
  size = 'md',
  weight,
  ...rest
}: TypographyProps) => {
  const { styles } = useStyles(typographyStyles);

  //   if (typeof children !== 'string') {
  //     return null;
  //   }
  return (
    <Text {...rest} style={[styles.typography({ size, weight }), style]}>
      {children}
    </Text>
  );
};
