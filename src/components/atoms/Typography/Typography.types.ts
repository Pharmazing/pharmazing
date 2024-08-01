import { TextProps } from 'react-native';

export type TypographyProps = TextProps & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: '100' | '300' | '400' | '500' | '700' | '900';
};
