import { useStyles } from 'react-native-unistyles';
import { ScrollBox } from '../../atoms';
import { productListStyles } from './ProductList.styles';
import { ProductListProps } from './ProductList.types';
import { ProductCard, ProductCardProps } from '../ProductCard';
import { Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export const ProductList = ({ cards }: ProductListProps) => {
  const { styles } = useStyles(productListStyles);
  const { id: vendorId } = useLocalSearchParams();
  // console.log();
  const renderCard = (card: ProductCardProps, i: number) => {
    return (
      <Pressable
        onPress={() =>
          router.navigate(`pharmacy/${vendorId}/${card.productId}`)
        }
        key={i}
      >
        <ProductCard {...card} />
      </Pressable>
    );
  };
  return (
    <ScrollBox contentContainerStyle={styles.container}>
      {cards?.map(renderCard)}
    </ScrollBox>
  );
};
