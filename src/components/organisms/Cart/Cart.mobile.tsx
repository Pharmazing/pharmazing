import React from 'react';
import { Box, ScrollBox, Typography } from '../../atoms';
import { useCart } from '../../../utils/context/useCart';
import { useGetProductsQuery } from '../../../generated/graphql';
import { Skeleton } from 'native-base';
import { ProductCard } from '../../molecules/ProductCard';
import { useStyles } from 'react-native-unistyles';

export function CartMobile() {
  const { theme } = useStyles();
  const { cart } = useCart();

  console.log('cart', cart);

  const productIds = cart?.items?.map((item) => item?.productId || '') || [];

  const { data, loading: getProductsLoading } = useGetProductsQuery({
    skip: !cart?.items?.length,
    onError: (err) => {
      console.warn(err.message);
    },
    variables: { vendor: { productId: productIds } },
  });

  console.log('data', data);

  const isLoading = getProductsLoading;

  return (
    <ScrollBox
      contentContainerStyle={{
        flex: 1,
      }}
    >
      {isLoading && (
        <Box
          style={{
            width: '100%',
            alignItems: 'center',
            gap: 16,
            padding: theme.size.layout.md,
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              style={{
                height: index === 0 || index === 1 ? 128 : 36,
                width: '100%',
                borderRadius: 12,
              }}
            />
          ))}
        </Box>
      )}
      {data?.getAllProducts?.length ? (
        <Box style={{ flex: 1, gap: theme.size.layout.md }}>
          {data.getAllProducts.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
          <Box
            style={{
              width: '100%',
              backgroundColor: theme.colors.Gray200,
              height: theme.size.layout.xs,
            }}
          ></Box>
        </Box>
      ) : (
        !isLoading && (
          <Box
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography weight="500" size="lg" style={{ opacity: 0.7 }}>
              No items in cart
            </Typography>
          </Box>
        )
      )}
    </ScrollBox>
  );
}
