import { Pressable, Text } from "react-native";
import { settingsLinkStyles } from "./SettingsLink.styles";
import { SettingsLinkProps } from "./SettingsLink.types";
import { router } from "expo-router";
import { Box, Icon } from "../../atoms";
import { useStyles } from "react-native-unistyles";

export const SettingsLink = ({
  href,
  content,
  icon,
  disabled = false,
  ...rest
}: SettingsLinkProps) => {
  const { styles, theme } = useStyles(settingsLinkStyles);
  const callbackFn = () => href && router.push(href);

  return (
    <Pressable disabled={disabled} onPress={() => callbackFn()} {...rest}>
      <Box style={styles.linkContainer}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          {icon && (
            <Icon
              name={icon}
              height={28}
              width={28}
              color={disabled ? theme.colors.Gray200 : ""}
            />
          )}
          {typeof content === "string" ? (
            <Text style={styles.textStyle({ disabled: !!disabled })}>
              {content}
            </Text>
          ) : (
            content
          )}
        </Box>
        <Icon
          name="ChevronRightIcon"
          height={32}
          width={32}
          color={disabled ? theme.colors.Gray200 : ""}
        />
      </Box>
    </Pressable>
  );
};
