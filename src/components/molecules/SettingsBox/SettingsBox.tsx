import { SettingsBoxProps } from "./SettingsBox.types";
import { Text, View } from "react-native";
import { SettingsLink } from "./SettingsLink";
import { settingsBoxStyles } from "./SettingsBox.styles";
import { useStyles } from "react-native-unistyles";
import { Box } from "../../atoms";

export const SettingsBox = ({
  title,
  settingLinks,
  ...rest
}: SettingsBoxProps) => {
  const { styles, theme } = useStyles(settingsBoxStyles);
  return (
    <Box style={styles.container} {...rest}>
      {title && <Text style={styles.header}>{title}</Text>}
      {settingLinks.map((linkProps, index) => {
        const isLast = settingLinks.length - 1 === index;
        const isFirst = index === 0;
        return (
          <View key={index}>
            <SettingsLink
              {...linkProps}
              style={{
                marginBottom: isLast ? 0 : 16,
                marginTop: isFirst ? 0 : 16,
              }}
            />
            {!isLast && (
              <View
                style={{
                  height: 2,
                  backgroundColor: theme.colors.Gray200,
                  borderRadius: 20,
                }}
              />
            )}
          </View>
        );
      })}
    </Box>
  );
};
