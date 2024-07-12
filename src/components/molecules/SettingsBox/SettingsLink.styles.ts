import { createStyleSheet } from "react-native-unistyles";

export const settingsLinkStyles = createStyleSheet({
  textStyle: ({ disabled }: { disabled?: boolean }) => ({
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: disabled ? "#DFDFDF" : "#484848",
  }),
  linkContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
});
