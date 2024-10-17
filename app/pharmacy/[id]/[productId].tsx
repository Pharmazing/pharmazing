import { Stack } from 'expo-router';
// import { Box } from '../../../src/components/atoms';
import { Box } from '../../../src/components';
import { ProductDetailPageLayout } from '../../../src/pages/ProductDetailPageLayout';
import * as Constants from 'expo-constants';

export default function Page() {
  return (
    <Box style={{ flex: 1, marginTop: Constants.default.statusBarHeight }}>
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitle: 'Back',
          headerTitle: 'Productpage',
        }}
      />
      <ProductDetailPageLayout />
    </Box>
  );
}
