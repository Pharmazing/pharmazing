import { router, useLocalSearchParams } from 'expo-router';
import { Box, LoadingIndicator } from '../../atoms';
import { AddressList, PlacesAutocomplete } from '../../molecules';

import { EventProvider } from 'react-native-outside-press';
import { useDeleteAddressMutation } from '../../../generated/graphql';
import { useToast } from '../../../utils/hooks/useToast';

export function Addresses() {
  const { showToast } = useToast({
    type: 'success',
    text1: 'Success',
    text2: 'Address deleted successfully',
  });
  const { showToast: showErrorToast } = useToast({
    type: 'error',
    text1: 'Error',
    text2: 'Address delete failed',
  });
  const [triggerDeleteAddress, { data, loading }] = useDeleteAddressMutation({
    onCompleted: () => showToast(),
    onError: () => showErrorToast(),
  });

  const { id: userId } = useLocalSearchParams();

  const openEditModal = (data: any) => {
    router.push({
      pathname: 'addresses/editAddress',
      params: { defaultData: JSON.stringify(data), userId },
    });
  };

  const onDeleteAddress = async (addressId: string) => {
    await triggerDeleteAddress({
      variables: { userId: userId as string, addressId },
    });
    return data;
  };

  return (
    <EventProvider>
      <Box style={{ flex: 1, backgroundColor: 'white' }}>
        <Box
          style={{
            width: '100%',
            zIndex: 1,
            padding: 8,
            position: 'absolute',
          }}
        >
          <PlacesAutocomplete onSelect={(data) => console.log(data)} />
        </Box>
        <Box style={{ marginTop: 60, flex: 1 }}>
          <AddressList
            openEditModal={openEditModal}
            onDeleteAddress={onDeleteAddress}
          />
        </Box>
        <LoadingIndicator loading={loading} />
      </Box>
    </EventProvider>
  );
}
