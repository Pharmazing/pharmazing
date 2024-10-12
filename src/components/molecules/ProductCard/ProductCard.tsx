import { useStyles } from 'react-native-unistyles';
import { Typography, Box } from '../../atoms';
import { productCardStyles } from './ProductCard.styles';
import { ProductCardProps } from './ProductCard.types';

export const ProductCard = (props: ProductCardProps) => {
  const { styles } = useStyles(productCardStyles);
  return (
    <Box style={styles.container}>
      <Typography>Product Card</Typography>
    </Box>
  );
};
