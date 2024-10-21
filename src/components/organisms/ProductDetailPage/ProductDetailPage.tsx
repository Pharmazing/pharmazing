import { useStyles } from 'react-native-unistyles';
import {
  Box,
  ButtonVariantEnum,
  Icon,
  Typography,
  Button,
  LoadingIndicator,
} from '../../atoms';
import { ProductDetailPageProps } from './ProductDetailPage.types';
import { productDetailPageStyles } from './ProductDetailPage.styles';
import { router } from 'expo-router';
import { Image } from 'react-native';
import { useState } from 'react';
import AnimatedNumber from 'react-native-animated-numbers';
import { useGetProductQuery } from '../../../generated/graphql';
import { useToast } from '../../../utils';

export const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {
  const { styles, theme } = useStyles(productDetailPageStyles);
  const { data, loading } = useGetProductQuery({
    onError: () => {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to get product',
      });
      router.back();
    },
    variables: { product: { productId } },
  });
  const [count, setCount] = useState(0);
  const { showToast } = useToast();

  return (
    <Box style={styles.container}>
      <Box style={styles.headerContainer}>
        <Icon
          onPress={() => router.back()}
          name="ChevronRightIcon"
          height={48}
          width={48}
          transform={'rotate(180 12 12)'}
        />
      </Box>
      <Image
        source={{ uri: 'https://picsum.photos/900/900' }}
        style={styles.imageContainer}
      />
      <Box style={styles.bottomSheet}>
        <Box style={{ gap: theme.size.layout.xs }}>
          <Typography size="xxl" weight="500">
            {data?.getProduct?.productName}
          </Typography>
          <Typography style={{ opacity: 0.6 }} size="md">
            {data?.getProduct?.productCategory}
          </Typography>
        </Box>
        <Typography numberOfLines={4} size="lg">
          {data?.getProduct?.productDescription}
        </Typography>
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography size="xl" weight="500">
            {`$${data?.getProduct?.productPrice}`}
          </Typography>
          <Box
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: theme.size.layout.lg,
            }}
          >
            <Button
              style={{ width: 36, height: 36, margin: 0 }}
              activeOpacity={0.6}
              title="-"
              btnVariant={ButtonVariantEnum.SECONDARY}
              onPress={() => setCount((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
            />
            <AnimatedNumber
              animateToNumber={count}
              animationDuration={300}
              fontStyle={{ fontSize: 20, fontFamily: 'Roboto_500Medium' }}
            />

            <Button
              style={{ width: 36, height: 36, margin: 0 }}
              activeOpacity={0.6}
              title="+"
              btnVariant={ButtonVariantEnum.SECONDARY}
              onPress={() => setCount((prev) => prev + 1)}
            />
          </Box>
        </Box>

        <Button
          style={{ width: '100%', alignSelf: 'center' }}
          activeOpacity={0.6}
          title="Buy Now"
          btnVariant={ButtonVariantEnum.PRIMARY}
        />
      </Box>
      <LoadingIndicator loading={loading} />
    </Box>
  );
};
