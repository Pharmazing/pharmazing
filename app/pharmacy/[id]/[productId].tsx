import { Stack } from 'expo-router';
// import { Box } from '../../../src/components/atoms';
import { Box } from '../../../src/components';
import { ProductDetailPageLayout } from '../../../src/pages/ProductDetailPageLayout';

export default function Page() {
  return (
    <Box>
      <Stack.Screen
        options={{ headerBackTitle: 'Back', headerTitle: 'Productpage' }}
      />
      <ProductDetailPageLayout />
    </Box>
  );
}
