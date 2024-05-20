import { isIOS, isAndroid, isWeb } from "./src/utils";
import { registerRootComponent } from "expo";
import { default as Web } from "./src/components/web/Web";
import { default as Mobile } from "./src/components/mobile/Mobile";
import React from "react";

function App() {
  return (
    <>
      {isWeb && <Web />}
      {(isIOS || isAndroid) && <Mobile />}
    </>
  );
}

export default registerRootComponent(App);
