import React from "react";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home" />
        <Tabs.Screen name="activity" />
        <Tabs.Screen name="settings" />
      </Tabs>
    </>
  );
}
