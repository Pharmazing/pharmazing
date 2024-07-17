import React from "react";
import { isAndroid, isIOS } from "../utils";
import { CartMobile } from "../components/organisms";

export default function CartLayout() {
  return <>{(isIOS || isAndroid) && <CartMobile />}</>;
}
