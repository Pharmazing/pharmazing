import React from "react";
import { Tabs, router, useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { isAndroid, isIOS, isWeb } from "../../src/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "../../src/components/atoms";
import { Button } from "react-native";

export default function Layout() {
  const segments = useSegments();
  return (
    <>
      {(isIOS || isAndroid) && (
        <Tabs sceneContainerStyle={{ backgroundColor: "#FAFAFA" }}>
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <Icon name="HomeIcon" color={color} />,
            }}
          />
          <Tabs.Screen
            name="activity"
            options={{
              title: "Activity",
              tabBarIcon: ({ color }) => (
                <Icon name="ActivityIcon" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              title: "Cart",
              tabBarIcon: ({ color }) => <Icon name="CartIcon" color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => (
                <Icon name="SettingsIcon" color={color} />
              ),
            }}
          />
          <Tabs.Screen name="somePage" options={{ tabBarButton: () => null }} />
          {/* <Tabs.Screen name="prescriptions" options={{ tabBarButton: () => null, headerShown: true, headerLeft: () => <Button title="Back" onPress={() => router.replace('/settings')}/> }} /> */}
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
