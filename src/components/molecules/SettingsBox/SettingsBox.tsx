import { SettingsBoxProps } from "./SettingsBox.types";
import { Text } from "react-native";
import { SettingsLink } from "./SettingsLink";
import { settingsBoxStyles } from "./SettingsBox.styles";
import { useStyles } from "react-native-unistyles";
import { Box } from "../../atoms";

export const SettingsBox = ({
  title,
  settingLinks,
  ...rest
}: SettingsBoxProps) => {
  const { styles } = useStyles(settingsBoxStyles);
  return (
    <Box style={styles.container} {...rest}>
      {title && <Text style={styles.header}>{title}</Text>}
      {settingLinks.map((linkProps, index) => {
        return (
          <SettingsLink
            {...linkProps}
            key={index}
            style={{ marginBottom: index === settingLinks.length - 1 ? 0 : 16 }}
          />
        );
      })}
    </Box>
  );
};
