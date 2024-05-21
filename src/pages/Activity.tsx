import React from "react";
import { Text } from "react-native";
import { isAndroid, isIOS, isWeb } from "../utils";
// import { Link } from "expo-router";

export default function ActivityLayout() {
  const Mobile = () => (
    <>
      <Text>I am the mobile activity page</Text>
      {/* <Link href="/home">Home</Link> */}
    </>
  );

  const Web = () => (
    <>
      <Text>I am the web activity page</Text>
      {/* <Link href="/home">Home</Link> */}
    </>
  );
  return (
    <>
      {(isIOS || isAndroid) && <Mobile />}
      {isWeb && <Web />}
    </>
  );
}
