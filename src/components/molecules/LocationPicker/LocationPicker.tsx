import { Box, Icon, Typography } from '../../atoms';
import { LocationPickerProps } from './LocationPicker.types';
import { locationPickerStyles } from './LocationPicker.styles';
import { useStyles } from 'react-native-unistyles';
import { useDeliveryLocation } from '../../../utils/context';
import { TouchableHighlight } from 'react-native';

export const LocationPicker = ({ onOpen }: LocationPickerProps) => {
  const { styles, theme } = useStyles(locationPickerStyles);

  const { shippingAddress } = useDeliveryLocation();
  return (
    <Box style={styles.container}>
      <TouchableHighlight
        onPress={onOpen}
        disabled={!shippingAddress.addressLine1}
      >
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.size.layout.md,
          }}
        >
          <Typography weight="500" size="md" style={styles.label}>
            {`${shippingAddress.addressLine1}, ${shippingAddress.parish}` ||
              'No address provided'}
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
