import React from "react";
import { isAndroid, isIOS } from "../utils";
import ActivityMobile from "../components/organisms/Activity/Activity.mobile"

export default function ActivityLayout() {
  return (
    <>
      {(isIOS || isAndroid) && <ActivityMobile />}
    </>
  );
}
