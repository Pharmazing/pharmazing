import { useStyles } from 'react-native-unistyles';
import { Box, Icon, ScrollBox, SearchBar, Typography } from '../../atoms';
import { vendorPageStyles } from './VendorPages.styles';
import { useState } from 'react';
import { router } from 'expo-router';
import { TouchableOpacity, Image } from 'react-native';
import { useDimensions } from '../../../utils';
import { Tabs } from '../../molecules';

export const VendorPage = ({ vendorId }: { vendorId: string }) => {
  const { styles } = useStyles(vendorPageStyles);
  const [search, setSearch] = useState<string>('');
  const { dimensions } = useDimensions();

  // get the vendor from gql
  return (
    <ScrollBox contentContainerStyle={styles.container}>
      <SearchBar
        autoComplete="off"
        placeholder="What are you looking for today?"
        value={search}
        onChangeText={setSearch}
        clearButtonMode="always"
        caretHidden
      />

      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Icon height={36} width={36} name="ChevronRightIcon" />
        <Typography>Back</Typography>
      </TouchableOpacity>
      <Box style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/800/800' }}
          style={{
            width: dimensions.screen.width,
            // height: 196,
            height: '100%',
            // display: 'none',
            position: 'relative',
            left: -8,
            zIndex: 3,
          }}
        />
      </Box>
      <Box style={{ flex: 1 }}>
        <Tabs />
      </Box>
    </ScrollBox>
  );
};
