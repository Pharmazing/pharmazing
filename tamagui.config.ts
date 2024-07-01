import { config } from "@tamagui/config/v3";
import { Text, View } from "react-native";
import { createTamagui } from "tamagui"; // or '@tamagui/core'

const tamaguiConfig = createTamagui(config);

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
