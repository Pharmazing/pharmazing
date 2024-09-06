import { VendorListProps } from './VendorList.types';
import { vendorListStyles } from './VendorList.styles';
import { useStyles } from 'react-native-unistyles';
import { Box, Typography } from '../../atoms';
import { router } from 'expo-router';
// import { TouchableHighlight } from 'react-native';
import { VendorCard } from './VendorCard';
export const VendorList = ({ vendors }: VendorListProps) => {
  const { styles } = useStyles(vendorListStyles);

  const renderVendorList = () => {
    const handleVendorClick = (vendorId: string) => {
      router.push(`/pharmacy/${vendorId}`);
    };
    return (
      vendors?.map((vendor) => {
        return (
          <VendorCard
            key={vendor.vendorId}
            vendor={vendor}
            onPress={handleVendorClick}
          />
        );
      }) || <Typography>No vendors found</Typography>
    );
  };

  return <Box>{renderVendorList()}</Box>;
};
