import { StatusBar } from 'expo-status-bar';
import { styles as homeStyles } from '../../../utils/appStyles/styles';
import {
  useCreateCartMutation,
  useGetAllVendorsQuery,
  useGetCartQuery,
} from '../../../generated/graphql';
import { Box, ScrollBox, SearchBar, Typography } from '../../atoms';
import { useStyles } from 'react-native-unistyles';
import { HeroCarousel, VendorList, VendorType } from '../../molecules';
import { RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { CartType, useCart, useUser } from '../../../utils/context';
import { useToast } from '../../../utils';

export function HomeMobile() {
  const { styles, theme } = useStyles(homeStyles);
  const { loading, data, refetch } = useGetAllVendorsQuery();
  const [search, setSearch] = useState<string>('');
  const {
    user: { userId },
  } = useUser();
  const { setCart } = useCart();
  const { showToast } = useToast();
  const { loading: cartLoading, error } = useGetCartQuery({
    variables: { userId: userId || '' },
    onCompleted: (data) => setCart(data.getCart as CartType),
    onError: () => {
      setCart(null);
      showToast({ type: 'error', text1: 'Error', text2: 'Failed to get cart' });
    },
  });
  const [createCartTrigger, { loading: createCartLoading }] =
    useCreateCartMutation({
      onCompleted: (data) => setCart(data.createCart as CartType),
    });

  useEffect(() => {
    if (error && userId) {
      createCartTrigger({ variables: { cart: { userId: userId || '' } } });
    }
  }, [error, userId, createCartTrigger]);

  const filteredVendors = data?.getAllVendors?.filter((vendor) =>
    vendor?.vendorName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ScrollBox
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={async () => await refetch()}
          />
        }
      >
        <Box style={styles.container}>
          <SearchBar
            autoComplete="off"
            placeholder="What are you looking for today?"
            value={search}
            onChangeText={setSearch}
            clearButtonMode="always"
            caretHidden
          />
          <HeroCarousel />
          <Typography
            weight="500"
            size="xl"
            style={{ marginBottom: theme.size.layout.md }}
          >
            Stores
          </Typography>

          <VendorList
            vendors={filteredVendors as VendorType[]}
            loading={loading || cartLoading || createCartLoading}
          />
          <StatusBar style="auto" />
        </Box>
      </ScrollBox>
      {/* <LoadingIndicator loading={loading} /> */}
    </>
  );
}
