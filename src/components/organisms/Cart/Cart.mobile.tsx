import React from 'react';
import {
  Box,
  Icon,
  ScrollBox,
  Typography,
  CustomInput,
  Button,
  ButtonVariantEnum,
} from '../../atoms';
import { useCart } from '../../../utils/context/useCart';
import { useGetProductsQuery } from '../../../generated/graphql';
import { Skeleton } from 'native-base';
import { ProductCard } from '../../molecules/ProductCard';
import { useStyles } from 'react-native-unistyles';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useDeliveryLocation } from '../../../utils/context';
import { TouchableOpacity } from 'react-native';

const DELIVERY_FEE = 600;
export function CartMobile() {
  const { theme } = useStyles();
  const { cart } = useCart();
  const { shippingAddress } = useDeliveryLocation();
  // console.warn('shippingAddress', shippingAddress);

  const { watch, control } = useForm({
    defaultValues: {
      name: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
  });

  const productIds = cart?.items?.map((item) => item?.productId || '') || [];

  const { data, loading: getProductsLoading } = useGetProductsQuery({
    skip: !cart?.items?.length,
    onError: (err) => {
      // console.warn(err.message);
    },
    variables: { vendor: { productId: productIds } },
  });

  const test = cart?.items?.reduce<{ subtotal: number }>(
    (acc, item) => {
      const productPrice = data?.getAllProducts?.find(
        (val) => val?.productId === item?.productId
      )?.productPrice;
      const subtotal =
        acc?.subtotal + (item?.quantity || 0) * (productPrice || 0);
      return {
        subtotal,
      };
    },
    { subtotal: 0 }
  );
  // console.warn('test', );
  const taxes = (test?.subtotal || 0) * 0.15;

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
          showsVerticalScrollIndicator={false}
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
                ctaTitle={`(${quantity}) Edit`}
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
          <Box style={{ padding: 8, gap: 16 }}>
            <Typography weight="500" size="xl">
              Shipping Address
            </Typography>
            <Box>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  weight="400"
                  size="lg"
                  style={{ color: theme.colors.Green500 }}
                >
                  {shippingAddress?.addressLine1 || 'Add Address'}
                </Typography>
                <Icon name="LocationIcon" color={theme.colors.Green500} />
              </TouchableOpacity>
            </Box>

            {/* <Typography>Inputs go here</Typography> */}
            <Box
              style={{
                width: '95%',
                alignSelf: 'center',
                backgroundColor: theme.colors.Gray100,
                height: theme.size.layout.xs,
                borderRadius: 50,
              }}
            ></Box>
            <Box
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography weight="500" size="lg">
                Subtotal
              </Typography>
              <Typography>{`$${test?.subtotal.toFixed(2)} `}</Typography>
            </Box>
            <Box
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography weight="500" size="lg">
                Delivery Fee
              </Typography>
              <Typography>{`$${DELIVERY_FEE.toFixed(2)} `}</Typography>
            </Box>
            <Box
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography weight="500" size="lg">
                Fees & Taxes
              </Typography>
              <Typography>{`$${taxes.toFixed(2)} `}</Typography>
            </Box>
            <Box
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography weight="500" size="lg">
                Total
              </Typography>
              <Typography>
                {`$${((test?.subtotal || 0) + DELIVERY_FEE + taxes).toFixed(2)} `}
              </Typography>
            </Box>
            <Box
              style={{
                width: '95%',
                alignSelf: 'center',
                backgroundColor: theme.colors.Gray100,
                height: theme.size.layout.xs,
                borderRadius: 50,
              }}
            ></Box>
            <Typography
              weight="500"
              size="xl"
              style={{ color: theme.colors.Green500 }}
            >
              Payment Method
            </Typography>
            <CustomInput
              control={control}
              watch={watch}
              name="name"
              placeholder="Name on card"
            />
            <CustomInput
              control={control}
              watch={watch}
              name="cardNumber"
              placeholder="Card Number"
            />
            <Box style={{ flexDirection: 'row', gap: 16 }}>
              <CustomInput
                control={control}
                watch={watch}
                name="expiry"
                placeholder="MM/YY"
                style={{ paddingHorizontal: 16, maxWidth: '100%' }}
              />
              <CustomInput
                control={control}
                watch={watch}
                name="cvv"
                placeholder="CVV"
                style={{ paddingHorizontal: 16, maxWidth: 64 }}
              />
            </Box>
          </Box>
          <Button
            btnVariant={ButtonVariantEnum.PRIMARY}
            style={{ alignSelf: 'center' }}
            title="Checkout"
          />
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
