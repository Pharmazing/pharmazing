import { BoxProps } from "../../atoms";
import { SettingsLinkProps } from "./SettingsLink.types";

export interface SettingsBoxProps extends BoxProps {
  title?: string;
  settingLinks: SettingsLinkProps[];
}
