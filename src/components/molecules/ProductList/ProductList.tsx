import { useStyles } from 'react-native-unistyles';
import { ScrollBox } from '../../atoms';
import { productListStyles } from './ProductList.styles';
import { ProductListProps } from './ProductList.types';
import { ProductCard, ProductCardProps } from '../ProductCard';

export const ProductList = ({ cards }: ProductListProps) => {
  const { styles } = useStyles(productListStyles);

  const renderCard = (card: ProductCardProps, i: number) => {
    return <ProductCard key={i} {...card} />;
  };
  return (
    <ScrollBox contentContainerStyle={styles.container}>
      {cards?.map(renderCard)}
    </ScrollBox>
  );
};
