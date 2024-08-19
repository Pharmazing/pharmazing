import { router, useLocalSearchParams } from 'expo-router';
import { Box, LoadingIndicator } from '../../atoms';
import { AddressList, PlacesAutocomplete } from '../../molecules';

import { EventProvider } from 'react-native-outside-press';
import {
  CreateAddressInput,
  useCreateAddressMutation,
  useDeleteAddressMutation,
} from '../../../generated/graphql';
import { useToast } from '../../../utils/hooks/useToast';
import { AddressType, useUser } from '../../../utils/context';
import { useRef } from 'react';
import { GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';

export function Addresses() {
  const { showToast } = useToast();
  const { addAddress, deleteAddress } = useUser();
  const autocompleteRef = useRef<GooglePlacesAutocompleteRef>(null);
  const deleteAddyIdRef = useRef<string | null>(null);
  const [triggerDeleteAddress, { data, loading }] = useDeleteAddressMutation({
    onCompleted: () => {
      deleteAddress(deleteAddyIdRef.current as string);
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Address deleted successfully',
      });
    },
    onError: () =>
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'Address delete failed',
      }),
  });

  const [
    triggerCreateAddress,
    { data: addAddyData, loading: addAddyLoading, error: addAddyErr },
  ] = useCreateAddressMutation({
    onCompleted: (data) => {
      addAddress(data.createAddress as AddressType);
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Address added successfully',
      });
      autocompleteRef.current?.clear();
    },
    onError: () =>
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'Address add failed',
      }),
  });

  const { id: userId } = useLocalSearchParams();

  const openEditModal = (data: any) => {
    router.push({
      pathname: 'signin2/setlocation',
      params: { defaultData: JSON.stringify(data), userId },
    });
  };

  const onDeleteAddress = async (addressId: string) => {
    deleteAddyIdRef.current = addressId;
    await triggerDeleteAddress({
      variables: { userId: userId as string, addressId },
    });
    return data;
  };

  const handleAddAddress = async (data: AddressType | null | undefined) => {
    const hasError = (data: AddressType | null | undefined) => {
      if (!data) return true;
      if (!data.addressLine1) return true;
      if (!data.city) return true;
      if (!data.country) return true;
      if (!data.zip) return true;
      if (!data.parish) return true;
      return false;
    };

    if (!hasError(data))
      await triggerCreateAddress({
        variables: {
          userId: userId as string,
          address: { ...data, primary: false } as CreateAddressInput,
        },
      });
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
          <PlacesAutocomplete
            onSelect={handleAddAddress}
            ref={autocompleteRef}
          />
        </Box>
        <Box style={{ marginTop: 60, flex: 1 }}>
          <AddressList
            openEditModal={openEditModal}
            onDeleteAddress={onDeleteAddress}
          />
        </Box>
        <LoadingIndicator loading={loading || addAddyLoading} />
      </Box>
    </EventProvider>
  );
}
