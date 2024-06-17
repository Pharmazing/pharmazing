import React from "react";
import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { isAndroid, isIOS, isWeb } from "../../src/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <>
      {(isIOS || isAndroid) && (
        <Tabs>
          <Tabs.Screen name="home" />
          <Tabs.Screen name="activity" />
          <Tabs.Screen name="cart" />
          <Tabs.Screen name="settings" />
        </Tabs>
      )}
      {isWeb && (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            {/* <Drawer.Screen name="home" />
            <Drawer.Screen name="activity" /> */}
          </Drawer>
        </GestureHandlerRootView>
      )}
    </>
  );
}
