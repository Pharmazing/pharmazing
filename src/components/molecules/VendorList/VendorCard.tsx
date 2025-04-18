import { Image, TouchableOpacity } from 'react-native';
import { Box, Typography } from '../../atoms';
import { VendorCardProps } from './VendorList.types';
import { useStyles } from 'react-native-unistyles';
import { vendorListStyles } from './VendorList.styles';
import DropShadow from 'react-native-drop-shadow';
import { LinearGradient } from 'expo-linear-gradient';
import { useDeliveryLocation } from '../../../utils/context';
import {
  GeolibLatitudeInputValue,
  GeolibLongitudeInputValue,
} from 'geolib/es/types';
import { getPreciseDistance } from 'geolib';

const isNumber = (value: any) => typeof value === 'number';

export const VendorCard = ({ vendor, onPress }: VendorCardProps) => {
  const { styles, theme } = useStyles(vendorListStyles);
  const { vendorId, vendorName, media, location } = vendor;
  const { shippingAddress } = useDeliveryLocation();
  const distance =
    isNumber(location?.latitude) &&
    isNumber(location?.longitude) &&
    isNumber(shippingAddress?.latitude) &&
    isNumber(shippingAddress?.longitude) &&
    getPreciseDistance(
      {
        latitude: location?.latitude as unknown as GeolibLatitudeInputValue,
        longitude: location?.longitude as unknown as GeolibLongitudeInputValue,
      },
      {
        latitude:
          shippingAddress?.latitude as unknown as GeolibLatitudeInputValue,
        longitude:
          shippingAddress?.longitude as unknown as GeolibLongitudeInputValue,
      }
    );

  return (
    <DropShadow style={styles.shadow}>
      <LinearGradient
        colors={[theme.colors.Blue500, theme.colors.Green500]}
        style={styles.vendorCardContainer}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.vendorCardButton}
          onPress={() => vendorId && onPress(vendor)}
        >
          <>
            <Box style={styles.vendorCardMediaContainer}>
              <DropShadow style={[styles.shadow, { flex: 1 }]}>
                <Image
                  resizeMode="cover"
                  style={styles.vendorCardImage}
                  src={'https://picsum.photos/800/800' || ''}
                />
              </DropShadow>
            </Box>
            <Box style={styles.writtenContent}>
              <Typography size="lg" weight="500" style={styles.vendorCardTitle}>
                {vendorName}
              </Typography>
              <Typography
                size="sm"
                weight="400"
                style={styles.vendorCardsubTitle}
              >
                {`${location?.addressLine1 || ''}${location?.parish ? `, ${location?.parish}` : ''}${location?.country ? `, ${location?.country}` : ''}`}
              </Typography>
              <Box style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Box
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    size="xs"
                    weight="500"
                    style={styles.vendorCardTitle}
                  >
                    $600
                  </Typography>
                  {location && shippingAddress && (
                    <Typography
                      size="xs"
                      weight="500"
                      style={styles.vendorCardTitle}
                    >
                      {distance && `${(distance / 1000000).toFixed(2)}km`}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </>
        </TouchableOpacity>
      </LinearGradient>
    </DropShadow>
  );
};
