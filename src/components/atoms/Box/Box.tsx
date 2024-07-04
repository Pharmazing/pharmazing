import { Stack, ScrollView } from "tamagui";
import { BoxProps } from "./Box.types";

export const Box = ({ children, scrollable, ...rest }: BoxProps) => {
  const component = scrollable ? (
    <ScrollView {...rest}>{children}</ScrollView>
  ) : (
    <Stack {...rest}>{children}</Stack>
  );
  return component;
};
