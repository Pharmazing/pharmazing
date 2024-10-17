import { Typography } from '../../atoms';
import { ProductDetailPageProps } from './ProductDetailPage.types';

export const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {
  return <Typography>{`I'm the pdp ${productId}`}</Typography>;
};
