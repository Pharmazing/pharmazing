import { TouchableOpacityProps } from 'react-native';
export enum ButtonVariantEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

export interface ButtonProps extends TouchableOpacityProps {
  btnVariant: ButtonVariantEnum;
  title: string;
}
