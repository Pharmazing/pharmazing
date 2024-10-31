import { Product } from '../../../generated/graphql';

export type ProductCardProps = Product & {
  onPress?: () => void;
  addToCart?: () => void;
};
