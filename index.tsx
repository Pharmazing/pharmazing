import { isIOS, isAndroid, isWeb } from "./src/utils";
// import { registerRootComponent } from "expo";
import { default as Web } from "./src/components/web/Web";
import { default as Mobile } from "./src/components/mobile/Mobile";
import React from "react";
import { Tabs } from "expo-router";

function App() {
  return (
    <>
      <Tabs.Screen />
      {isWeb && <Web />}
      {(isIOS || isAndroid) && <Mobile />}
    </>
  );
}

export default App;
