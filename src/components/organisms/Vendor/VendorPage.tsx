import { useStyles } from 'react-native-unistyles';
import { Box, Icon, ScrollBox, SearchBar, Typography } from '../../atoms';
import { vendorPageStyles } from './VendorPages.styles';
import { useState } from 'react';
import { router } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import { useDimensions } from '../../../utils';

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
      <Box>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Icon height={36} width={36} name="ChevronRightIcon" />
          <Typography>Back</Typography>
        </TouchableOpacity>
        <Box>
        <Image
          source={{ uri: 'https://picsum.photos/1920/1080' }}
          style={{
            width: dimensions.screen.width,
            height: 256,
            position: 'relative',
            left: -8,
          }}
        />

        </Box>
      </Box>
    </ScrollBox>
  );
};
