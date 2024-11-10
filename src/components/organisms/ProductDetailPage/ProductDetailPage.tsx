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
import { useCallback, useState } from 'react';
import AnimatedNumber from 'react-native-animated-numbers';
import { useGetProductQuery } from '../../../generated/graphql';
import { useDimensions, useToast } from '../../../utils';
import { useCart } from '../../../utils/context';
import { debounce } from 'lodash';
// import { debounce } from 'lodash';

export const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {
  const { styles, theme } = useStyles(productDetailPageStyles);
  const { cart, setItemQuantity, loading: cartLoading } = useCart();
  const { data, loading: productLoading } = useGetProductQuery({
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
  const productQuantity =
    cart?.items?.find((item) => item?.productId === productId)?.quantity || 0;
  const [count, setCount] = useState(productQuantity);
  const { showToast } = useToast();
  const { dimensions } = useDimensions();

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = useCallback(() => {
    setCount((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  }, []);

  const handleAddToCart = debounce(() => {
    setItemQuantity(productId, count);
  }, 500);

  const loading = productLoading || cartLoading;

  return (
    <Box style={styles.container}>
      {/* <Box style={styles.headerContainer}>
        <Icon
          onPress={() => router.back()}
          name="ChevronRightIcon"
          height={48}
          width={48}
          transform={'rotate(180 12 12)'}
        />
      </Box> */}
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
              onPress={handleDecrement}
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
              onPress={handleIncrement}
            />
          </Box>
        </Box>

        <Box
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            gap: theme.size.layout.lg,
            justifyContent: 'center',
          }}
        >
          <Button
            style={styles.addToCartButton({
              width: dimensions.screen.width * 0.5,
            })}
            activeOpacity={0.6}
            title="Checkout"
            icon={
              <Icon
                name="CartIcon"
                height={28}
                width={28}
                color={theme.colors.Green700}
              />
            }
            btnVariant={ButtonVariantEnum.SECONDARY}
            onPress={() => router.push('/cart')}
          />
          <Button
            style={styles.addToCartButton({
              width: dimensions.screen.width * 0.4,
            })}
            activeOpacity={0.6}
            title="Add to Cart"
            btnVariant={ButtonVariantEnum.PRIMARY}
            onPress={handleAddToCart}
          />
          {/* <Box
            style={{
              height: 40,
              width: 40,
              backgroundColor: 'black',
              borderRadius: 24,
            }}
          ></Box> */}
        </Box>
      </Box>
      <LoadingIndicator loading={loading} />
    </Box>
  );
};
