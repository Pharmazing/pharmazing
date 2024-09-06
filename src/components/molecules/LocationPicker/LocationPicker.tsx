import { Box, Typography } from '../../atoms';
import { LocationPickerProps } from './LocationPicker.types';
import { locationPickerStyles } from './LocationPicker.styles';
import { useStyles } from 'react-native-unistyles';
import { useState } from 'react';

export const LocationPicker = ({ onOpen }: LocationPickerProps) => {
  const { styles } = useStyles(locationPickerStyles);

  const [selectedLocation, setSelectedLocation] = useState({
    value: {},
    label: 'address 1',
  });
  return (
    <Box style={styles.container}>
      {/* <Button title={selectedLocation.label} btnVariant={ButtonVariantEnum.DANGER} onPress={onOpen}/> */}
      <Typography onPress={onOpen}>{selectedLocation.label}</Typography>
    </Box>
  );
};
