import { VendorListProps, VendorType } from './VendorList.types';
import { vendorListStyles } from './VendorList.styles';
import { useStyles } from 'react-native-unistyles';
import { Box, Typography } from '../../atoms';
import { router } from 'expo-router';
// import { TouchableHighlight } from 'react-native';
import { VendorCard } from './VendorCard';
import { VendorListSkeleton } from './VendorListSkeleton';

export const VendorList = ({ vendors, loading }: VendorListProps) => {
  const { styles } = useStyles(vendorListStyles);

  const renderVendorList = () => {
    const handleVendorClick = ({ vendorId, vendorName }: VendorType) => {
      router.push(`/pharmacy/${vendorId}?vendorName=${vendorName}`);
    };
    if (loading) {
      return <VendorListSkeleton />;
    }
    return (
      vendors?.map((vendor) => {
        const { vendorId } = vendor;
        return (
          <VendorCard
            key={vendorId}
            vendor={vendor}
            onPress={handleVendorClick}
          />
        );
      }) || <Typography>No vendors found</Typography>
    );
  };

  return <Box>{renderVendorList()}</Box>;
};
