import { router, Stack } from 'expo-router';
import { Box, Icon } from '../../../src/components';
import { ProductDetailPageLayout } from '../../../src/pages/ProductDetailPageLayout';
import { useStyles } from 'react-native-unistyles';

export default function Page() {
  const { theme } = useStyles();
  return (
    <Box style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitle: 'Back',
          headerTitle: 'Product Page',
          headerLeft: () => (
            <Icon
              name="ChevronRightIcon"
              color={theme.colors.white}
              height={36}
              width={36}
              transform={'rotate(180 12 12)'}
              onPress={() => router.back()}
            />
          ),
          headerTitleStyle: { color: 'white', fontSize: 24 },
          headerStyle: { backgroundColor: theme.colors.Green500 },
        }}
      />
      <ProductDetailPageLayout />
    </Box>
  );
}
