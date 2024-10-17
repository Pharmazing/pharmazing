import { useStyles } from 'react-native-unistyles';
import { Box, Icon, Typography } from '../../atoms';
import { ProductDetailPageProps } from './ProductDetailPage.types';
import { productDetailPageStyles } from './ProductDetailPage.styles';
import { router } from 'expo-router';
import { Image } from 'react-native';
export const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {
  const { styles } = useStyles(productDetailPageStyles);
  return (
    <Box style={styles.container}>
      <Box style={styles.headerContainer}>
        <Icon
          onPress={() => router.back()}
          name="ChevronRightIcon"
          height={48}
          width={48}
          transform={'rotate(180)'}
        />
      </Box>
      <Image
        source={{ uri: 'https://picsum.photos/900/900' }}
        style={styles.imageContainer}
      ></Image>
      <Box style={styles.bottomSheet}>
        <Typography size="xxl" weight="500">
          ProductName
        </Typography>
        <Typography size="md">{productId}</Typography>
      </Box>
    </Box>
  );
};
