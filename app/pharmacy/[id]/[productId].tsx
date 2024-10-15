import { Stack } from 'expo-router';
import { Box, Typography } from '../../../src/components/atoms';

export default function Page() {
  return (
    <Box>
      <Stack.Screen
        options={{ headerBackTitle: 'Back', headerTitle: 'Productpage' }}
      />
      <Typography>I'm the PDP</Typography>
    </Box>
  );
}
