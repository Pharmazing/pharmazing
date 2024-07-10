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
  ...rest
}: SettingsLinkProps) => {
  const { styles } = useStyles(settingsLinkStyles);
  const callbackFn = () => href && router.replace(href);

  return (
    <Pressable onPress={() => callbackFn()} {...rest}>
      <Box style={styles.linkContainer}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          {icon && <Icon name={icon} height={28} width={28} />}
          {typeof content === "string" ? (
            <Text style={settingsLinkStyles.textStyle}>{content}</Text>
          ) : (
            content
          )}
        </Box>
        <Icon name="ChevronRightIcon" height={32} width={32} />
      </Box>
    </Pressable>
  );
};
