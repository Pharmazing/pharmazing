import { BoxProps } from "./Box.types";
import { View } from "react-native";

export const Box = ({ children, ...rest }: BoxProps) => {
  return <View {...rest}>{children}</View>;
};
