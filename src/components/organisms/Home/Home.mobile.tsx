import { StatusBar } from 'expo-status-bar';
import { styles as homeStyles } from '../../../utils/appStyles/styles';
import { useGetAllVendorsQuery } from '../../../generated/graphql';
import { Box, LoadingIndicator, ScrollBox, Typography } from '../../atoms';
import { useStyles } from 'react-native-unistyles';
import { VendorList, VendorType } from '../../molecules';

export function HomeMobile() {
  const { styles, theme } = useStyles(homeStyles);
  const { loading, error, data } = useGetAllVendorsQuery({
    variables: {},
  });

  return (
    <>
      <ScrollBox>
        <Box style={styles.container}>
          <Typography
            weight="500"
            size="lg"
            style={{ marginBottom: theme.size.layout.lg }}
          >
            Stores
          </Typography>

          <VendorList vendors={data?.getAllVendors as VendorType[]} />
          {/* {error && <Text>Error: {JSON.stringify(error)}</Text>} */}
          {/* <Text style={{ color: 'red' }}>{JSON.stringify(data)}</Text> */}
          {/* <Text>{JSON.stringify(data)}</Text> */}
          <StatusBar style="auto" />
        </Box>
      </ScrollBox>
      <LoadingIndicator loading={loading} />
    </>
  );
}
