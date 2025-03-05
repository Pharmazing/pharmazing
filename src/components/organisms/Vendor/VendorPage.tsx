import { useStyles } from 'react-native-unistyles';
import {
  Box,
  Icon,
  LoadingIndicator,
  ScrollBox,
  SearchBar,
  Typography,
} from '../../atoms';
import { vendorPageStyles } from './VendorPages.styles';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity, Image } from 'react-native';
import { useDimensions } from '../../../utils';
import { Tabs } from '../../molecules';
import { useGetProductsQuery } from '../../../generated/graphql';
import { ProductCardProps } from '../../molecules/ProductCard';
import { useCart } from '../../../utils/context';

export const VendorPage = ({ vendorId }: { vendorId: string }) => {
  const { styles, theme } = useStyles(vendorPageStyles);
  const [search, setSearch] = useState<string>('');
  const { loading: cartLoading } = useCart();
  const { dimensions } = useDimensions();
  const { vendorName } = useLocalSearchParams();
  const { data, loading: productsLoading } = useGetProductsQuery({
    variables: { vendor: { vendorId } },
  });
  const cards = data?.getAllProducts || [];
  // get the vendor from gql
  const loading = productsLoading || cartLoading;
  return (
    <ScrollBox contentContainerStyle={styles.container}>
      <Tabs
        cards={cards as ProductCardProps[]}
        renderHeader={() => (
          <Box style={{ gap: theme.size.layout.md }}>
            <Box style={{ padding: theme.size.layout.lg, paddingBottom: 0 }}>
              <SearchBar
                autoComplete="off"
                placeholder="What are you looking for today?"
                value={search}
                onChangeText={setSearch}
                clearButtonMode="always"
                // caretHidden
              />
            </Box>

            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: theme.size.layout.md,
              }}
            >
              <Icon
                height={32}
                width={32}
                name="ChevronRightIcon"
                transform={'rotate(180 12 12)'}
              />
              <Typography size="xl" style={{ color: theme.colors.FgDefault }}>
                {vendorName || '{{Vendor Name}}'}
              </Typography>
            </TouchableOpacity>
            <Box style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://picsum.photos/800/800' }}
                style={{
                  width: dimensions.screen.width,
                  flex: 1,
                }}
              />
            </Box>
          </Box>
        )}
      />
      <LoadingIndicator loading={loading} />
    </ScrollBox>
  );
};
