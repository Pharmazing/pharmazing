import { createStyleSheet } from "react-native-unistyles";

export const buttonStyles = createStyleSheet((theme) => ({
  primary: {
    borderColor: "green",
    borderWidth: 1,
  },
  secondary: { borderColor: "blue", borderWidth: 1 },
  danger: {
    borderRadius: 24,
    backgroundColor: theme.colors.Red700,
    opacity: 0.64,
    height: 48,
    margin: 16,
    width: { xs: 200, sm: 220, md: 240, lg: 260, xl: 280 },
    display: "flex",
    borderWidth: 1,
    borderColor: theme.colors.Red700,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Roboto_700Bold",
    color: "#fff",
    fontSize: { xs: 16, sm: 18, md: 20, lg: 22, xl: 24 },
    opacity: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    // elevation: 5,
  },
}));
