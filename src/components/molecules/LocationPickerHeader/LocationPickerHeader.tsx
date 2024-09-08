import { useStyles } from 'react-native-unistyles';
import { Icon } from '../../atoms';
import { locationPickerHeaderStyles } from './LocationPickerHeader.styles';
import { LocationPicker } from '../LocationPicker';
import { LocationPickerHeaderProps } from './LocationPickerHeader.types';
import { LinearGradient } from 'expo-linear-gradient';
export const LocationPickerHeader = ({
  isOpen,
  onOpen,
  onClose,
}: LocationPickerHeaderProps) => {
  const { styles, theme } = useStyles(locationPickerHeaderStyles);
  return (
    <LinearGradient
      start={[0, 1]}
      end={[1, 0]}
      colors={[theme.colors.Blue400, theme.colors.Green400]}
      style={styles.container}
    >
      <Icon name="LocationIcon" color={theme.colors.white} />

      <LocationPicker isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </LinearGradient>
  );
};
