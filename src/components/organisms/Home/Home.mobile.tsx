import { StatusBar } from 'expo-status-bar';
import { styles as homeStyles } from '../../../utils/appStyles/styles';
import { useGetAllVendorsQuery } from '../../../generated/graphql';
import { Box, ScrollBox, Typography } from '../../atoms';
import { useStyles } from 'react-native-unistyles';
import { HeroCarousel, VendorList, VendorType } from '../../molecules';
import { RefreshControl } from 'react-native';

export function HomeMobile() {
  const { styles, theme } = useStyles(homeStyles);
  const { loading, data, refetch } = useGetAllVendorsQuery();

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
          <HeroCarousel />
          <Typography
            weight="500"
            size="xl"
            style={{ marginBottom: theme.size.layout.md }}
          >
            Stores
          </Typography>

          <VendorList
            vendors={data?.getAllVendors as VendorType[]}
            loading={loading}
          />
          <StatusBar style="auto" />
        </Box>
      </ScrollBox>
      {/* <LoadingIndicator loading={loading} /> */}
    </>
  );
}
