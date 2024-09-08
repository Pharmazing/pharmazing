import { StatusBar } from 'expo-status-bar';
import { styles as homeStyles } from '../../../utils/appStyles/styles';
import { useGetAllVendorsQuery } from '../../../generated/graphql';
import { Box, LoadingIndicator, ScrollBox, Typography } from '../../atoms';
import { useStyles } from 'react-native-unistyles';
import { VendorList, VendorType } from '../../molecules';

export function HomeMobile() {
  const { styles, theme } = useStyles(homeStyles);
  const { loading, data } = useGetAllVendorsQuery({
    variables: {},
  });

  return (
    <>
      <ScrollBox>
        <Box style={styles.container}>
          <Typography
            weight="500"
            size="xl"
            style={{ marginBottom: theme.size.layout.lg }}
          >
            Stores
          </Typography>

          <VendorList vendors={data?.getAllVendors as VendorType[]} />
          <StatusBar style="auto" />
        </Box>
      </ScrollBox>
      <LoadingIndicator loading={loading} />
    </>
  );
}
