import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, Typography } from '../../../src/components/atoms';

export default function Page() {
  const { productId } = useLocalSearchParams();
  return (
    <Box>
      <Stack.Screen
        options={{ headerBackTitle: 'Back', headerTitle: 'Productpage' }}
      />
      <Typography>{`I'm the PdP, productId: ${productId}`}</Typography>
    </Box>
  );
}
