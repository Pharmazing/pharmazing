import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { VendorLayout } from '../../src/pages/Vendor';
import { LocationPickerHeader } from '../../src/components/molecules';
import { useActionSheet } from '../../src/utils/hooks/useActionSheet';
import { Actionsheet, NativeBaseProvider } from 'native-base';
import {
  useUser,
  useDeliveryLocation,
  AddressType,
} from '../../src/utils/context';
import { useStyles } from 'react-native-unistyles';

export default function Page() {
  const { theme } = useStyles();
  const { id: vendorId } = useLocalSearchParams();
  const { isOpen, onClose, onOpen } = useActionSheet();
  const { address } = useUser();
  const { updateShippingAddress } = useDeliveryLocation();
  const renderLocationActionSheet = () => {
    const handleItemClick = (addy: AddressType) => {
      updateShippingAddress(addy);
      onClose();
    };
    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content borderTopRadius={theme.size.layout.lg}>
          {address?.map((addy, index) => {
            return (
              <Actionsheet.Item
                onPress={() => handleItemClick(addy)}
                key={index}
              >
                {addy.addressLine1}
              </Actionsheet.Item>
            );
          })}
          <Actionsheet.Item onPress={onClose}>Dismiss</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    );
  };
  return (
    <NativeBaseProvider>
      <View>
        <Stack.Screen
          options={{
            headerTitle: `Details for ${vendorId}`,
            headerBackTitle: 'Home',
            contentStyle: {
              backgroundColor: '#FAFAFA',
              gap: 40,
              display: 'flex',
              flexDirection: 'column',
            },
            header: () => (
              <LocationPickerHeader
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
              />
            ),
          }}
        />
        <VendorLayout vendorId={vendorId as string} />
        {renderLocationActionSheet()}
      </View>
    </NativeBaseProvider>
  );
}
