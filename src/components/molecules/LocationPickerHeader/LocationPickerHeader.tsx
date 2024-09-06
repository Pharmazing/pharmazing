import { useStyles } from 'react-native-unistyles';
import { Box, Icon } from '../../atoms';
import { locationPickerHeaderStyles } from './LocationPickerHeader.styles';
import { LocationPicker } from '../LocationPicker';
import { LocationPickerHeaderProps } from './LocationPickerHeader.types';

export const LocationPickerHeader = ({
  isOpen,
  onOpen,
  onClose,
}: LocationPickerHeaderProps) => {
  const { styles } = useStyles(locationPickerHeaderStyles);
  return (
    <Box style={styles.container}>
      <Icon name="LocationIcon" />

      <LocationPicker isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};
