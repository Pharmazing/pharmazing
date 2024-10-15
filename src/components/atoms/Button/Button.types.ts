import { TouchableOpacityProps } from 'react-native';
import { IconProps } from '../Icon/Icons.types';
// import { Icon } from '../Icon';
import { ReactElement } from 'react';
export enum ButtonVariantEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

export interface ButtonProps extends TouchableOpacityProps {
  btnVariant: ButtonVariantEnum;
  title: string;
  textColor?: string;
  renderIcon?: boolean;
  icon?: ReactElement<IconProps>;
  shadowRadius?: number;
  renderShadow?: boolean;
}
