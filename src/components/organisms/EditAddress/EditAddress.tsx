import { useLocalSearchParams } from 'expo-router';
import { Box, LoadingIndicator, ScrollBox } from '../../atoms';
import { Text } from 'react-native';
import { EditAddressForm } from '../../molecules';
import { EventProvider } from 'react-native-outside-press';
import { useEffect } from 'react';
import { useEditAddressMutation } from '../../../generated/graphql';
import { useToast } from '../../../utils/hooks/useToast';

export const EditAddress = () => {
  const { showToast: showSuccessToast } = useToast({
    type: 'success',
    text1: 'Success',
    text2: 'Address updated successfully',
  });
  const { showToast: showErrorToast } = useToast({
    type: 'error',
    text1: 'Error',
    text2: 'Address update failed',
  });
  const { userId, defaultData } = useLocalSearchParams();
  if (!defaultData || !userId) {
    return null;
  }

  const [triggerEditAddress, { loading }] = useEditAddressMutation({
    onCompleted: (data) => {
      showSuccessToast();
    },
    onError: (error) => {
      console.log('error', error);
      showErrorToast();
    },
  });

  const parsedDefaultData = JSON.parse(defaultData as string);
  const parsedUserId = userId as string;

  return (
    <EventProvider>
      <ScrollBox contentContainerStyle={{ flex: 1, paddingTop: 16 }}>
        <EditAddressForm
          onSave={(data) =>
            triggerEditAddress({
              variables: {
                userId: parsedUserId,
                address: {
                  ...data,
                },
              },
            })
          }
          defaultValues={parsedDefaultData}
        />
        <LoadingIndicator loading={loading} />
      </ScrollBox>
    </EventProvider>
  );
};
