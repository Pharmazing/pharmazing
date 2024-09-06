import { TouchableHighlight } from 'react-native';
import { Typography } from '../../atoms';
import { VendorCardProps } from './VendorList.types';
import { useStyles } from 'react-native-unistyles';
import { vendorListStyles } from './VendorList.styles';
import DropShadow from 'react-native-drop-shadow';

export const VendorCard = ({ vendor, onPress }: VendorCardProps) => {
  const { styles } = useStyles(vendorListStyles);
  const { vendorId, vendorName } = vendor;

  return (
    <DropShadow style={styles.shadow}>
      <TouchableHighlight
        style={styles.vendorCardContainer}
        onPress={() => vendorId && onPress(vendorId)}
      >
        <Typography>{vendorName}</Typography>
        {/* <Typography>{vendor.address}</Typography> */}
      </TouchableHighlight>
    </DropShadow>
  );
};
