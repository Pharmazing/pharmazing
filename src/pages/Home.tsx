import React from "react";
import { isIOS, isAndroid, isWeb } from "../utils";
import { HomeMobile, HomeWeb } from "../components/organisms";

export default function HomeLayout() {
  return (
    <>
      {isWeb && <HomeWeb />}
      {(isIOS || isAndroid) && <HomeMobile />}
    </>
  );
}
