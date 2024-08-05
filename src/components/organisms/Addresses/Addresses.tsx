import { useSession } from '../../../utils/context';
import { Box } from '../../atoms';
import {
  AddressList,
  EditAddressForm,
  PlacesAutocomplete,
} from '../../molecules';
import { Text } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { EventProvider } from 'react-native-outside-press';

export function Addresses() {
  const snapPoints = useMemo(() => ['90%'], []);
  const { session } = useSession();
  const [defaultData, setDefaultData] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    setEditModalOpen(index);
  }, []);
  const parsedSession = JSON.parse(session || '{}');
  parsedSession?.user?.address?.forEach((addy: any) => console.log(addy));

  const openEditModal = (data: any) => {
    setDefaultData(data);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const BottomSheetEditForm = useCallback(() => {
    return (
      <BottomSheetView style={{ flex: 1, padding: 16 }}>
        {/* <Text>{JSON.stringify(defaultData)}</Text> */}
        <EditAddressForm defaultValues={defaultData} />
      </BottomSheetView>
    );
  }, [defaultData]);

  return (
    <EventProvider>
      <Box style={{ flex: 1, backgroundColor: 'white' }}>
        <Box
          style={{
            width: '100%',
            zIndex: 1,
            position: 'relative',
          }}
        >
          <PlacesAutocomplete disabled={editModalOpen !== -1} />
        </Box>
        <Box style={{ marginTop: 44, flex: 1 }}>
          <AddressList
            editModalOpen={editModalOpen !== -1}
            openEditModal={openEditModal}
          />
        </Box>
        <BottomSheet
          index={editModalOpen}
          enablePanDownToClose
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
        >
          <BottomSheetEditForm />
        </BottomSheet>
      </Box>
    </EventProvider>
  );
}
