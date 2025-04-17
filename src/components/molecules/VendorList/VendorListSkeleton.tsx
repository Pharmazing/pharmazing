import { Skeleton } from 'native-base';
import { vendorListStyles } from './VendorList.styles';
import { useStyles } from 'react-native-unistyles';
import { Box } from '../../atoms';
const CARDS = 6;

export const VendorListSkeleton = () => {
  const { styles } = useStyles(vendorListStyles);
  return Array.from({ length: CARDS }).map((_, index) => (
    <Box
      style={[styles.vendorCardContainer, styles.vendorCardButton]}
      key={index}
    >
      <Box style={styles.vendorCardMediaContainer}>
        <Skeleton style={styles.vendorCardImage} />
      </Box>
      <Box style={{ flexDirection: 'column', flex: 1 }}>
        <Skeleton.Text />
      </Box>
    </Box>
  ));
};
