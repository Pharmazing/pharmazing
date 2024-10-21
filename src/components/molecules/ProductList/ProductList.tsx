import { useStyles } from 'react-native-unistyles';
import { ScrollBox, Typography } from '../../atoms';
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
      {cards.length > 0 ? (
        cards?.map(renderCard)
      ) : (
        <Typography
          size="lg"
          weight="500"
          style={{ opacity: 0.7, alignSelf: 'center' }}
        >
          No products yet
        </Typography>
      )}
    </ScrollBox>
  );
};
