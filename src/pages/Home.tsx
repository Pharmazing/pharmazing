import React from "react";
import { isIOS, isAndroid, isWeb } from "../utils";
import { default as Web } from "../components/organisms/Home/Home.web";
import { default as Mobile } from "../components/organisms/Home/Home.mobile";

export default function Home() {
  return (
    <>
      {isWeb && <Web />}
      {(isIOS || isAndroid) && <Mobile />}
    </>
  );
}
