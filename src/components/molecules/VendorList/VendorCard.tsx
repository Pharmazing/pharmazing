import { TouchableHighlight, Image } from 'react-native';
import { Box, Typography } from '../../atoms';
import { VendorCardProps } from './VendorList.types';
import { useStyles } from 'react-native-unistyles';
import { vendorListStyles } from './VendorList.styles';
import DropShadow from 'react-native-drop-shadow';
import { LinearGradient } from 'expo-linear-gradient';

export const VendorCard = ({ vendor, onPress }: VendorCardProps) => {
  const { styles, theme } = useStyles(vendorListStyles);
  const { vendorId, vendorName, media } = vendor;
  return (
    <DropShadow style={styles.shadow}>
      <LinearGradient
        colors={[theme.colors.Blue500, theme.colors.Green500]}
        style={styles.vendorCardContainer}
      >
        <TouchableHighlight
          style={styles.vendorCardButton}
          onPress={() => vendorId && onPress(vendorId)}
        >
          <>
            <Box style={styles.vendorCardMediaContainer}>
              <DropShadow style={[styles.shadow, { flex: 1 }]}>
                <Image
                  resizeMode="cover"
                  style={styles.vendorCardImage}
                  src={media?.[0]?.url || ''}
                />
              </DropShadow>
            </Box>
            <Typography size="lg" weight="500" style={styles.vendorCardTitle}>
              {vendorName}
            </Typography>
          </>
        </TouchableHighlight>
      </LinearGradient>
    </DropShadow>
  );
};
