import React from "react";
import { Text } from "react-native";
import { isAndroid, isIOS, isWeb } from "../utils";

export default function ActivityLayout() {
  const Mobile = () => <Text>I am the mobile activity page</Text>;

  const Web = () => <Text>I am the web activity page</Text>;
  return (
    <>
      {(isIOS || isAndroid) && <Mobile />}
      {isWeb && <Web />}
    </>
  );
}
