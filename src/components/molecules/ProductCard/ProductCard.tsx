import { useStyles } from 'react-native-unistyles';
import { Image } from 'react-native';
import { Typography, Box } from '../../atoms';
import { productCardStyles } from './ProductCard.styles';
import { ProductCardProps } from './ProductCard.types';
import { LinearGradient } from 'expo-linear-gradient';

export const ProductCard = ({ productName, media }: ProductCardProps) => {
  const { styles, theme } = useStyles(productCardStyles);
  return (
    <Box style={styles.container}>
      <Box style={styles.imageContainer}>
        <LinearGradient
          style={{
            padding: 4,
            flexGrow: 1,
            borderRadius: theme.size.layout.lg + 4,
          }}
          start={[0, 0]}
          end={[1, 1]}
          colors={[theme.colors.Blue400, theme.colors.Green400]}
        >
          <Image
            style={styles.image}
            source={{ uri: media?.[0]?.url || 'https://picsum.photos/500/500' }}
          />
        </LinearGradient>
      </Box>
      <Box style={styles.contentContainer}>
        <Typography weight="500" size="lg">
          {productName}
        </Typography>
      </Box>
    </Box>
  );
};
