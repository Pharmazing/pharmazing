import { useSession } from '../../../utils/context';
import { Box } from '../../atoms';
import { AddressList } from '../../molecules';
import { Text } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';

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

  return (
    <Box style={{ flex: 1, borderWidth: 2, borderColor: 'red' }}>
      <AddressList
        editModalOpen={editModalOpen !== -1}
        openEditModal={openEditModal}
      />
      <BottomSheet
        index={editModalOpen}
        enablePanDownToClose
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <Text>{JSON.stringify(defaultData)}</Text>
        </BottomSheetView>
      </BottomSheet>
      {/* <Box> */}

      {/* </Box> */}
    </Box>
  );
}
