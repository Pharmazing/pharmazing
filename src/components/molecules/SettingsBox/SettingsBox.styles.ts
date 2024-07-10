import { createStyleSheet } from "react-native-unistyles";
export const settingsBoxStyles = createStyleSheet({
  header: {
    fontFamily: "Roboto_700Bold",
    fontSize: 24,
    marginBottom: 16,
  },
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 24,
    flexDirection: "column",
    backgroundColor: "#EFEFEF",
  },
});
