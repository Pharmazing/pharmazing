import {
  Box,
  Button,
  ButtonVariantEnum,
  Icon,
  LoadingIndicator,
  ScrollBox,
  Typography,
} from '../components';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet, useToast } from '../utils';
import { NativeBaseProvider, Actionsheet } from 'native-base';

const prescriptions = [
  {
    id: '1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: '3 times a day',
    pharmacyName: 'PharmaCare Plus',
    status: 'Ready for Pickup',
  },
  {
    id: '2',
    name: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'Once a day',
    pharmacyName: 'HealthFirst Pharmacy',
    status: 'In Progress',
  },
  {
    id: '3',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Daily',
    pharmacyName: 'WellnessRX',
    status: 'Filled',
  },
];

const statusColors = {
  'Ready for Pickup': '#4caf50',
  'In Progress': '#ff9800',
  Filled: '#2196f3',
};

export default function PrescriptionsLayout() {
  const { showToast } = useToast();
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
        <ScrollBox style={{ padding: 16 }}>
          {prescriptions.map((rx) => (
            <Box key={rx.id} style={styles.card}>
              <Box style={styles.cardTop}>
                <Typography style={styles.title}>{rx.name}</Typography>
                <Typography
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusColors[rx.status as string] },
                  ]}
                >
                  {rx.status}
                </Typography>
              </Box>
              <Typography
                style={styles.detail}
              >{`Dosage: ${rx.dosage}`}</Typography>
              <Typography
                style={styles.detail}
              >{`Frequency: ${rx.frequency}`}</Typography>
              <Typography
                style={styles.detail}
              >{`Pharmacy: ${rx.pharmacyName}`}</Typography>
            </Box>
          ))}
        </ScrollBox>
        <Button
          title="Add new prescription"
          style={{ position: 'static', alignSelf: 'center', width: '80%' }}
          btnVariant={ButtonVariantEnum.PRIMARY}
          icon={<Icon name="PlusIcon" color="white" height={16} width={16} />}
          onPress={onOpen}
        />
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item onPress={handleChooseFile}>
              Choose File
            </Actionsheet.Item>
            <Actionsheet.Item onPress={handleTakePhoto}>
              Take Photo
            </Actionsheet.Item>
            <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        <LoadingIndicator loading={false} />
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: '#3a3a3a',
    borderWidth: 1,
    flexDirection: 'column',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  detail: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    color: '#fff',
    fontSize: 12,
    overflow: 'hidden',
  },
});
