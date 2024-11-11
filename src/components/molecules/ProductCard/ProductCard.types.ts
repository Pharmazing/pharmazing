import { ReactElement } from 'react';
import { Product } from '../../../generated/graphql';
import { IconProps } from '../../atoms/Icon/Icons.types';
import { GestureResponderEvent } from 'react-native';

export type ProductCardProps = Product & {
  onPress?: (event: GestureResponderEvent) => void;
  addToCart?: () => void;
  ctaTitle: string;
  ctaIcon?: ReactElement<IconProps>;
};
