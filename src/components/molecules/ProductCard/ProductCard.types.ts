import { Product } from '../../../generated/graphql';

export type ProductCardProps = Omit<Product, '__typename'> & {};
