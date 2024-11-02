import { useStyles } from 'react-native-unistyles';
import { ScrollBox, Typography } from '../../atoms';
import { productListStyles } from './ProductList.styles';
import { ProductListProps } from './ProductList.types';
import { ProductCard, ProductCardProps } from '../ProductCard';
import { useCart } from '../../../utils/context';

export const ProductList = ({ cards }: ProductListProps) => {
  const { setItemQuantity, cart } = useCart();
  const { styles } = useStyles(productListStyles);
  const renderCard = (card: ProductCardProps, i: number) => {
    return (
      <ProductCard
        key={i}
        {...card}
        onPress={() => {
          const cartItemQuantity =
            cart?.items?.find((val) => val?.productId === card?.productId)
              ?.quantity || 0;
          setItemQuantity(card?.productId || '', cartItemQuantity + 1);
        }}
      />
    );
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
