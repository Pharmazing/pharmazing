import { ScrollBoxProps } from "./ScrollBox.types";
import { ScrollView } from "react-native";

export const ScrollBox = ({ children, ...rest }: ScrollBoxProps) => {
  return <ScrollView {...rest}>{children}</ScrollView>;
};
