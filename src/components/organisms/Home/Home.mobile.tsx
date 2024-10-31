import { StatusBar } from 'expo-status-bar';
import { styles as homeStyles } from '../../../utils/appStyles/styles';
import { useGetAllVendorsQuery } from '../../../generated/graphql';
import { Box, ScrollBox, SearchBar, Typography } from '../../atoms';
import { useStyles } from 'react-native-unistyles';
import { HeroCarousel, VendorList, VendorType } from '../../molecules';
import { RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { useCart, useUser } from '../../../utils/context';

export function HomeMobile() {
  const { styles, theme } = useStyles(homeStyles);
  const {
    user: { userId },
  } = useUser();
  const { loading, data, refetch } = useGetAllVendorsQuery();
  const [search, setSearch] = useState<string>('');

  const { loading: cartLoading, getCart } = useCart();

  const filteredVendors = data?.getAllVendors?.filter((vendor) =>
    vendor?.vendorName?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    userId && getCart();
  }, []);

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
            loading={loading || cartLoading}
          />
          <StatusBar style="auto" />
        </Box>
      </ScrollBox>
      {/* <LoadingIndicator loading={loading} /> */}
    </>
  );
}
