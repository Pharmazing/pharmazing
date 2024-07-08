import { Pressable } from "react-native";
import { StyledLinkContainer, settingsLinkStyles } from "./SettingsLink.styles";
import { SettingsLinkProps } from "./SettingsLink.types";
import { router } from "expo-router";
import { Text } from "tamagui";
import { Box, Icon } from "../../atoms";

export const SettingsLink = ({
  href,
  content,
  icon,
  ...rest
}: SettingsLinkProps) => {
  const callbackFn = () => href && router.replace(href);

  return (
    <Pressable onPress={() => callbackFn()} {...rest}>
      <StyledLinkContainer>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          {icon && <Icon name={icon} height={32} width={32} />}
          {typeof content === "string" ? (
            <Text style={settingsLinkStyles.textStyle}>{content}</Text>
          ) : (
            { content }
          )}
        </Box>
        <Icon name="ChevronRightIcon" height={32} width={32} />
      </StyledLinkContainer>
    </Pressable>
  );
};
