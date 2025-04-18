import {
  Box,
  Button,
  ButtonVariantEnum,
  Icon,
  LoadingIndicator,
  PrescriptionsList,
  Typography,
} from '../components';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet, useToast } from '../utils';
import { NativeBaseProvider, Actionsheet } from 'native-base';
import { useStyles } from 'react-native-unistyles';
import { prescriptions as mockPrescriptions } from '../components/molecules/PrescriptionsList/PrescriptionsList.mock';

export default function PrescriptionsLayout() {
  const { showToast } = useToast();
  const { theme } = useStyles();
  const { isOpen, onOpen, onClose } = useActionSheet();

  const handleChooseFile = async () => {
    onClose();
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      showToast({
        text1: 'Permission to access media library is required!',
        type: 'error',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Image selected: ', result.assets);
    } else {
      console.log('User cancelled image picker');
    }
  };

  const handleTakePhoto = async () => {
    onClose();
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      showToast({
        text1: 'Permission to access the camera is required!',
        type: 'error',
      });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Photo taken: ', result.assets);
    } else {
      console.log('User cancelled camera');
    }
  };

  return (
    <NativeBaseProvider>
      <Box style={{ flex: 1 }}>
        <PrescriptionsList prescriptions={mockPrescriptions} />
        <Button
          title="Add new prescription"
          style={{ position: 'static', alignSelf: 'center', width: '80%' }}
          btnVariant={ButtonVariantEnum.PRIMARY}
          icon={
            <Icon
              name="PlusIcon"
              color={theme.colors.FgDefaultInverted}
              height={16}
              width={16}
            />
          }
          onPress={onOpen}
        />
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content
            style={{ backgroundColor: theme.colors.BgDefault }}
          >
            <Actionsheet.Item
              style={{ backgroundColor: theme.colors.BgDefault }}
              onPress={handleChooseFile}
            >
              <Typography>Choose File</Typography>
            </Actionsheet.Item>
            <Actionsheet.Item
              style={{ backgroundColor: theme.colors.BgDefault }}
              onPress={handleTakePhoto}
            >
              <Typography>Take Photo</Typography>
            </Actionsheet.Item>
            <Actionsheet.Item
              style={{ backgroundColor: theme.colors.BgDefault }}
              onPress={onClose}
            >
              <Typography>Cancel</Typography>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        <LoadingIndicator loading={false} />
      </Box>
    </NativeBaseProvider>
  );
}
