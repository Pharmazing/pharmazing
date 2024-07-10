import { config } from "@tamagui/config/v3";
import { createFont, createTamagui } from "tamagui"; // or '@tamagui/core'

const blackPalette = [
  "#000000",
  "#212121",
  "#3b3b3b",
  "#585858",
  "#777777",
  "#979797",
  "#b9b9b9",
  "#dbdbdb",
  "#ffffff",
];

const primaryBluePalette = [
  "#239ad1",
  "#68a2dc",
  "#93aae3",
  "#b5b4e5",
  "#cfbfe7",
  "#e2cde8",
  "#f0dcec",
  "#faedf3",
  "#ffffff",
  "#111111",
];

const themes = {
  light: {
    primaryBtnBackground: "red",
  },
  dark: {},
};
// const fonts = {
//   "Roboto700Bold": createFont({family: "Roboto_700Bold", size: { small: 4 } }),
// };

// const tokens = createTokens({ size: { small: 4 } } as any);
const tamaguiConfig = createTamagui({ ...config, themes });

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
