import { createStyleSheet } from "react-native-unistyles";

export const settingsLinkStyles = createStyleSheet({
  textStyle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
  },
  linkContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
});
