import { useStyles } from 'react-native-unistyles';
import { Box, Icon, ScrollBox, SearchBar, Typography } from '../../atoms';
import { vendorPageStyles } from './VendorPages.styles';
import { useState } from 'react';
import { router } from 'expo-router';
import { TouchableOpacity, Image } from 'react-native';
import { useDimensions } from '../../../utils';
import { Tabs } from '../../molecules';

export const VendorPage = ({ vendorId }: { vendorId: string }) => {
  const { styles, theme } = useStyles(vendorPageStyles);
  const [search, setSearch] = useState<string>('');
  const { dimensions } = useDimensions();

  // get the vendor from gql
  return (
    <ScrollBox contentContainerStyle={styles.container}>
      <Tabs
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
                height={36}
                width={36}
                name="ChevronRightIcon"
                transform={'rotate(180 12 12)'}
              />
              <Typography>{`[Vendor Name]`}</Typography>
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
    </ScrollBox>
  );
};
