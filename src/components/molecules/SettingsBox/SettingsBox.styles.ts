import { createStyleSheet } from "react-native-unistyles";
export const settingsBoxStyles = createStyleSheet((theme) => ({
  header: {
    fontFamily: "Roboto_700Bold",
    fontSize: 24,
    marginBottom: 16,
    color: theme.colors.Gray600,
  },
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 24,
    flexDirection: "column",
    backgroundColor: theme.colors.Gray100,
  },
}));
