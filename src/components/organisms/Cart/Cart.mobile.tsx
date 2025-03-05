import React, { useEffect } from 'react';
import {
  Box,
  Icon,
  ScrollBox,
  Typography,
  CustomInput,
  Toggle,
  SlidingButton,
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
import { useDeliveryLocation, useUser } from '../../../utils/context';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { isIOS } from '../../../utils';
import { WebView } from 'react-native-webview';

const DELIVERY_FEE = 600;
// const FYGARO_SECRET= process.env.EXPO_PUBLIC_FYGARO_SECRET;
export function CartMobile() {
  const [checkedOut, setCheckedOut] = React.useState(false);
  const [autoBilling, setAutoBilling] = React.useState(true);
  const { theme } = useStyles();

  const { cart } = useCart();
  const { shippingAddress } = useDeliveryLocation();
  const {
    user: { userId, email },
  } = useUser();
  const { watch, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      cardNumber: null,
      expiry: '',
      cvv: '',
      billingAddressLine1: '',
      billingAddressLine2: '',
      billingCity: '',
      billingParish: '',
      billingCountry: '',
      billingZip: '',
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
  const taxes = (test?.subtotal || 0) * 0.15;

  const isLoading = getProductsLoading;

  const matchBillingAddress = (val: boolean) => {
    // setAutoBilling(val);
    if (val) {
      setValue('billingAddressLine1', shippingAddress?.addressLine1 || '');
      setValue('billingAddressLine2', shippingAddress?.addressLine2 || '');
      setValue('billingCity', shippingAddress?.city || '');
      setValue('billingParish', shippingAddress?.parish || '');
      setValue('billingCountry', shippingAddress?.country || '');
      setValue('billingZip', shippingAddress?.zip || '');
    }
  };

  useEffect(() => {
    matchBillingAddress(autoBilling);
  }, [shippingAddress]);

  console.log('checkedout', checkedOut);

  const total = ((test?.subtotal || 0) + DELIVERY_FEE + taxes).toFixed(2);

  return !checkedOut ? (
    <KeyboardAvoidingView
      enabled
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={128}
      style={{ flex: 1 }}
    >
      <ScrollBox
        scrollEnabled={false}
        StickyHeaderComponent={() => (
          <Typography weight="500" size="xl">
            Cart
          </Typography>
        )}
        // nestedScrollEnabled
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
                  ctaTitle={`(${quantity}) Update`}
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
                    router.push(
                      `/pharmacy/${item?.vendorId}/${item?.productId}`
                    )
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
            <Box style={{ padding: 8, gap: 16, paddingBottom: 16 }}>
              <Typography weight="500" size="xl">
                Shipping Address
              </Typography>
              <Box>
                <TouchableOpacity
                  onPress={() =>
                    userId
                      ? router.replace('/home')
                      : router.push('/signin2/setlocation')
                  }
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
              <Typography weight="500" size="xl">
                Billing Address
              </Typography>
              <Box style={{ gap: theme.size.layout.lg }}>
                <Box
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: theme.size.layout.lg,
                  }}
                >
                  <Toggle
                    value={autoBilling}
                    onValueChange={(val: boolean) => {
                      setAutoBilling(val);
                      matchBillingAddress(val);
                    }}
                  />
                  <Typography weight="400" size="lg">
                    Same as shipping address
                  </Typography>
                </Box>
                {!autoBilling && (
                  <>
                    <CustomInput
                      control={control}
                      watch={watch}
                      name="billingAddressLine1"
                      placeholder="Address Line 1"
                      rules={{
                        required: 'Billing address is required',
                      }}
                    />
                    <CustomInput
                      control={control}
                      watch={watch}
                      name="billingAddressLine2"
                      placeholder="Address Line 2"
                      // rules={{
                      //   required: 'Billing address is required',
                      // }}
                    />
                    <CustomInput
                      style={{ flex: 1 }}
                      control={control}
                      watch={watch}
                      name="billingCity"
                      placeholder="City"
                      rules={{
                        required: 'City is required',
                      }}
                    />
                    <Box
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        gap: theme.size.layout.lg,
                      }}
                    >
                      <CustomInput
                        style={{ flex: 1 }}
                        control={control}
                        watch={watch}
                        name="billingParish"
                        placeholder="Parish"
                        rules={{
                          required: 'Parish is required',
                        }}
                      />
                    </Box>
                    <Box
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        gap: theme.size.layout.lg,
                      }}
                    >
                      <CustomInput
                        style={{ flex: 1 }}
                        control={control}
                        watch={watch}
                        name="billingCountry"
                        placeholder="Country"
                        rules={{
                          required: 'Country is required',
                        }}
                      />
                      <CustomInput
                        style={{ flex: 1 }}
                        control={control}
                        watch={watch}
                        name="billingZip"
                        placeholder="Zip"
                        rules={{
                          required: 'Zip is required',
                        }}
                      />
                    </Box>
                  </>
                )}
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography weight="500" size="lg">
                  Subtotal
                </Typography>
                <Typography>{`$${test?.subtotal.toFixed(2)} `}</Typography>
              </Box>
              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography weight="500" size="lg">
                  Delivery Fee
                </Typography>
                <Typography>{`$${DELIVERY_FEE.toFixed(2)} `}</Typography>
              </Box>
              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography weight="500" size="lg">
                  Fees & Taxes
                </Typography>
                <Typography>{`$${taxes.toFixed(2)} `}</Typography>
              </Box>
              <Box
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography weight="500" size="lg">
                  Total
                </Typography>
                <Typography>{`$${total} `}</Typography>
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
                rules={{
                  required: 'Name is required',
                }}
              />
              <CustomInput
                control={control}
                watch={watch}
                name="cardNumber"
                placeholder="Card Number"
                keyboardType="number-pad"
                maxLength={16}
                rules={{
                  required: 'Card number is required',
                  validate: (val) => {
                    if (!Number(val)) {
                      return 'Card number is invalid';
                    }
                    return true;
                  },
                }}
              />
              <Box style={{ flexDirection: 'row', width: '100%' }}>
                <CustomInput
                  control={control}
                  watch={watch}
                  name="expiry"
                  keyboardType="number-pad"
                  maxLength={5}
                  placeholder="MM/YY"
                  style={{ width: '50%' }}
                  rules={{
                    required: 'Expiry is required',
                    validate: (val) => {
                      const valid = val.match(/^(0[1-9]|1[0-2])\/\d{2}$/);
                      if (!valid && val.length === 5) {
                        return 'Expiry is invalid';
                      }
                      return true;
                    },
                  }}
                />
                <CustomInput
                  control={control}
                  watch={watch}
                  name="cvv"
                  placeholder="CVV"
                  style={{ width: '40%' }}
                  maxLength={3}
                  keyboardType="number-pad"
                  rules={{
                    required: 'Cvv is required',
                    validate: (val) => {
                      if (!Number(val) && val.length === 3) {
                        return 'Cvv is invalid';
                      }
                      return true;
                    },
                  }}
                />
              </Box>

              {isIOS ? (
                <SlidingButton
                  title="Slide to Checkout"
                  onReachedToEnd={handleSubmit(() => {
                    console.warn('Checkout', control._formValues);
                    setCheckedOut(true);
                  })}
                />
              ) : (
                <Button
                  btnVariant={ButtonVariantEnum.PRIMARY}
                  title="Checkout"
                  style={{ alignSelf: 'center' }}
                  onPress={handleSubmit(() => {
                    console.warn('Checkout', control._formValues);
                    setCheckedOut(true);
                  })}
                />
              )}
            </Box>
          </ScrollBox>
        ) : (
          !isLoading && (
            <Box
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography weight="500" size="lg" style={{ opacity: 0.7 }}>
                No items in cart
              </Typography>
            </Box>
          )
        )}
      </ScrollBox>
    </KeyboardAvoidingView>
  ) : (
    <>
      <Button
        btnVariant={ButtonVariantEnum.SECONDARY}
        title="Back to cart"
        onPress={() => setCheckedOut(false)}
        style={{ alignSelf: 'center' }}
      />
      <WebView
        javaScriptEnabled
        source={{
          uri: `https://www.fygaro.com/en/pb/f114d44a-e26e-4ece-9efd-90babe3636a6?amount=${total}`,
          // method: 'POST',
          // headers: {
          //   alg: "HS256",
          //   typ: "JWT",
          //   kid: FYGARO_SECRET,
          // },
          // body: JSON.stringify({
          //   amount: total,
          //   currency: 'JMD',
          //   email,
          //   name: watch('name'),
          // }),
        }}
        style={{ flex: 1, width: '100%' }}
        onNavigationStateChange={(navState) => {
          console.warn('navState', navState.url);
          if (
            navState.url !==
            `https://www.fygaro.com/en/pb/f114d44a-e26e-4ece-9efd-90babe3636a6?amount=${total}`
          ) {
            setCheckedOut(false);
          }
        }}
      />
    </>
  );
}
