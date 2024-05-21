import React from "react";
import { isIOS, isAndroid, isWeb } from "../utils";
import { default as Web } from "../components/web/Web";
import { default as Mobile } from "../components/mobile/Mobile";

export default function Home() {
  return (
    <>
      {isWeb && <Web />}
      {(isIOS || isAndroid) && <Mobile />}
    </>
  );
}
