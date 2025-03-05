import { TextProps } from 'react-native';

export type TypographyProps = TextProps & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  weight?: '100' | '300' | '400' | '500' | '700' | '900';
  inverted?: boolean;
};
