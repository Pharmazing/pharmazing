import { Box, Icon, Typography } from '../../atoms';
import { LocationPickerProps } from './LocationPicker.types';
import { locationPickerStyles } from './LocationPicker.styles';
import { useStyles } from 'react-native-unistyles';
import { useDeliveryLocation, useUser } from '../../../utils/context';
import { TouchableHighlight } from 'react-native';
import { router } from 'expo-router';

export const LocationPicker = ({ onOpen }: LocationPickerProps) => {
  const { styles, theme } = useStyles(locationPickerStyles);
  const {
    user: { userId },
  } = useUser();
  const { shippingAddress } = useDeliveryLocation();
  return (
    <Box style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          if (shippingAddress.addressLine1 && userId) {
            onOpen();
          } else {
            router.push('/signin2/setlocation');
          }
        }}
        // disabled={!shippingAddress.addressLine1}
      >
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.size.layout.md,
          }}
        >
          <Typography weight="500" size="md" style={styles.label}>
            {shippingAddress.addressLine1 && shippingAddress.parish
              ? `${shippingAddress.addressLine1}, ${shippingAddress.parish}`
              : 'Add delivery address'}
          </Typography>
          <Icon
            style={{ margin: 0, padding: 0 }}
            name="ChevronRightIcon"
            color={theme.colors.white}
          />
        </Box>
      </TouchableHighlight>
    </Box>
  );
};
