import React from 'react';
import { Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { isAndroid, isIOS } from '../../src/utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from '../../src/components/atoms';
import { useStyles } from 'react-native-unistyles';
import { LocationPickerHeader } from '../../src/components/molecules';
import { useActionSheet } from '../../src/utils/hooks';
import { Actionsheet, NativeBaseProvider } from 'native-base';
import {
  AddressType,
  useDeliveryLocation,
  useUser,
} from '../../src/utils/context';

export default function Layout() {
  const { theme } = useStyles();
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
    <>
      {isIOS || isAndroid ? (
        <NativeBaseProvider>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: theme.colors.Green550,
              tabBarStyle: { backgroundColor: theme.colors.tabsContentBg },
            }}
            sceneContainerStyle={{
              backgroundColor: theme.colors.tabsContentBg,
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                // headerTransparent: true,
                header: (props) => {
                  return (
                    <LocationPickerHeader
                      isOpen={isOpen}
                      onClose={onClose}
                      onOpen={onOpen}
                    />
                  );
                },
                headerTitle: 'Home',
                tabBarIcon: ({ color }) => (
                  <Icon name="HomeIcon" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="activity"
              options={{
                title: 'Activity',
                tabBarIcon: ({ color }) => (
                  <Icon name="ActivityIcon" color={color} />
                ),
                headerStyle: { backgroundColor: theme.colors.Blue400 },
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                title: 'Cart',
                tabBarIcon: ({ color }) => (
                  <Icon name="CartIcon" color={color} height={30} width={30} />
                ),
                headerStyle: { backgroundColor: theme.colors.Green400 },
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Settings',
                tabBarIcon: ({ color }) => (
                  <Icon name="SettingsIcon" color={color} />
                ),
                headerShown: false,
              }}
            />
            <Tabs.Screen
              name="somePage"
              options={{ tabBarButton: () => null }}
            />
          </Tabs>
          {renderLocationActionSheet()}
        </NativeBaseProvider>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            <Drawer.Screen name="home" />
            <Drawer.Screen name="somePage" />
            <Drawer.Screen
              name="activity"
              options={{ drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen
              name="cart"
              options={{ drawerItemStyle: { display: 'none' } }}
            />
            <Drawer.Screen
              name="settings"
              options={{ drawerItemStyle: { display: 'none' } }}
            />
            {/* <Drawer.Screen
              name="prescriptions"
              options={{ drawerItemStyle: { display: "none" } }}
            /> */}
          </Drawer>
        </GestureHandlerRootView>
      )}
    </>
  );
}
