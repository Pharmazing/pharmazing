import React from 'react';
import { Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { isAndroid, isIOS } from '../../src/utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from '../../src/components/atoms';
import { useStyles } from 'react-native-unistyles';
import { LocationPickerHeader } from '../../src/components/molecules';
import { useActionSheet } from '../../src/utils/hooks/useActionSheet';
import { Actionsheet, NativeBaseProvider } from 'native-base';
import { AddressType, useUser } from '../../src/utils/context';

export default function Layout() {
  const { theme } = useStyles();
  const { isOpen, onClose, onOpen } = useActionSheet();
  const renderLocationActionSheet = () => {
    const { address } = useUser();
    const handleItemClick = (addy: AddressType) => {
      console.log(addy);
      onClose();
    };
    return (
      <Actionsheet
        // style={{ zIndex: 2, position: 'absolute' }}
        isOpen={isOpen}
        onClose={onClose}
      >
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
            sceneContainerStyle={{
              backgroundColor: theme.colors.tabsContentBg,
            }}
          >
            <Tabs.Screen
              name="home"
              // initialParams={{isOpen, onClose, onOpen}}
              options={{
                // headerTransparent: true,
                header: () => (
                  <LocationPickerHeader
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                  />
                ),
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
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                title: 'Cart',
                tabBarIcon: ({ color }) => (
                  <Icon name="CartIcon" color={color} height={30} width={30} />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Settings',
                tabBarIcon: ({ color }) => (
                  <Icon name="SettingsIcon" color={color} />
                ),
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
