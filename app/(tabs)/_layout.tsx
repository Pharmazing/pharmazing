import React from "react";
import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { isAndroid, isIOS, isWeb } from "../../src/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeIcon from "../../src/icons/HomeIcon";
import ActivityIcon from "../../src/icons/ActivityIcon";
import CartIcon from "../../src/icons/CartIcon";
import SettingsIcon from "../../src/icons/SettingsIcon";

export default function Layout() {
  return (
    <>
      {(isIOS || isAndroid) && (
        <Tabs sceneContainerStyle={{ backgroundColor: "#FAFAFA" }}>
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <HomeIcon color={color} />,
            }}
          />
          <Tabs.Screen
            name="activity"
            options={{
              title: "Activity",
              tabBarIcon: ({ color }) => <ActivityIcon color={color} />,
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              title: "Cart",
              tabBarIcon: ({ color }) => <CartIcon color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
            }}
          />
          <Tabs.Screen name="somePage" options={{ tabBarButton: () => null }} />
        </Tabs>
      )}
      {isWeb && (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            <Drawer.Screen name="home" />
            <Drawer.Screen name="somePage" />
            <Drawer.Screen
              name="activity"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="cart"
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="settings"
              options={{ drawerItemStyle: { display: "none" } }}
            />
          </Drawer>
        </GestureHandlerRootView>
      )}
    </>
  );
}
