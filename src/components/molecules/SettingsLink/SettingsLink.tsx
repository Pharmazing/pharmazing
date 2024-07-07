import ChevronRight from "../../../icons/ChevronRight";
import { StyledLinkContainer, settingsLinkStyles } from "./SettingsLink.styles";
import { SettingsLinkProps } from "./SettingsLink.types";
import { Link } from "expo-router";
import { Text } from "tamagui";

export const SettingsLink = ({ href, ...rest }: SettingsLinkProps) => {
  return (
    <Link href={href} {...rest}>
      <StyledLinkContainer>
        <Text style={settingsLinkStyles.textStyle}>Settings link</Text>
        <ChevronRight height={32} width={32} />
      </StyledLinkContainer>
    </Link>
  );
};
