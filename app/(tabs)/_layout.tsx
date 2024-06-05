import React from "react";
import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { isAndroid, isIOS, isWeb } from "../../src/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useSession } from "../../src/utils/context";

export default function Layout() {
  // const { session } = useSession();
  // console.log(session);
  return (
    <>
      {(isIOS || isAndroid) && (
        <Tabs>
          <Tabs.Screen name="home" />
          <Tabs.Screen name="activity" />
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
