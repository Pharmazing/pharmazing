import React from 'react';
import { Box, Icon, ScrollBox, Typography } from '../../atoms';
import { useCart } from '../../../utils/context/useCart';
import { useGetProductsQuery } from '../../../generated/graphql';
import { Skeleton } from 'native-base';
import { ProductCard } from '../../molecules/ProductCard';
import { useStyles } from 'react-native-unistyles';
import { router } from 'expo-router';

export function CartMobile() {
  const { theme } = useStyles();
  const { cart } = useCart();

  const productIds = cart?.items?.map((item) => item?.productId || '') || [];

  const { data, loading: getProductsLoading } = useGetProductsQuery({
    skip: !cart?.items?.length,
    onError: (err) => {
      // console.warn(err.message);
    },
    variables: { vendor: { productId: productIds } },
  });

  const isLoading = getProductsLoading;

  return (
    <ScrollBox
      nestedScrollEnabled
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
        <ScrollBox
          nestedScrollEnabled
          contentContainerStyle={{ gap: theme.size.layout.md }}
        >
          {data.getAllProducts.map((item, index) => {
            const quantity =
              cart?.items?.find((val) => val?.productId === item?.productId)
                ?.quantity || 99;
            // console.warn('newPrices', quantity);
            return (
              <ProductCard
                key={index}
                {...item}
                ctaTitle="Edit"
                ctaIcon={
                  <Icon
                    name="EditIcon"
                    color={theme.colors.white}
                    height={16}
                    width={16}
                  />
                }
                onPress={() =>
                  item?.productId &&
                  router.push(`/pharmacy/${item?.vendorId}/${item?.productId}`)
                }
                productPrice={
                  item?.productPrice
                    ? item?.productPrice * quantity
                    : item?.productPrice
                }
              />
            );
          })}
          <Box
            style={{
              width: '100%',
              backgroundColor: theme.colors.Gray200,
              height: theme.size.layout.xs,
            }}
          ></Box>
        </ScrollBox>
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
