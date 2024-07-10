import { ReactNode } from "react";
import { PressableProps } from "react-native";
import { IconNamesType } from "../../atoms/Icon/Icons.types";

export interface SettingsLinkProps extends PressableProps {
  content: ReactNode | string;
  href?: string;
  icon?: IconNamesType;
}
