import { useLocalSearchParams } from 'expo-router';
import { LoadingIndicator, ScrollBox } from '../../atoms';
import { EditAddressForm } from '../../molecules';
import { EventProvider } from 'react-native-outside-press';
import { useEditAddressMutation } from '../../../generated/graphql';
import { useToast } from '../../../utils/hooks/useToast';

export const EditAddress = () => {
  const { showToast } = useToast();

  const { userId, defaultData } = useLocalSearchParams();
  if (!defaultData || !userId) {
    return null;
  }

  const [triggerEditAddress, { loading }] = useEditAddressMutation({
    onCompleted: () => {
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Address updated successfully',
      });
    },
    onError: () => {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'Address update failed',
      });
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
