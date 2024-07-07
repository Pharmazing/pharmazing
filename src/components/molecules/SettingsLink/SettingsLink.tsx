import { Text } from "tamagui";
import { SettingsLinkProps } from "./SettingsLink.types";
import { Link } from "expo-router";

export const SettingsLink = ({ href, ...rest }: SettingsLinkProps) => {
  return (
    <Link href={href} {...rest}>
      Settings link
    </Link>
  );
};
