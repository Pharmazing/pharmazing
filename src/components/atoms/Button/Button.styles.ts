import { createStyleSheet } from "react-native-unistyles";

export const buttonStyles = createStyleSheet({
  primary: {
    borderColor: "green",
    borderWidth: 1,
  },
  secondary: { borderColor: "blue", borderWidth: 1 },
  danger: {
    borderRadius: 24,
    backgroundColor: "#B00000",
    opacity: 0.64,
    height: 48,
    margin: 16,
    width: 200,
    display: "flex",
    borderWidth: 1,
    borderColor: "#B00000",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Roboto_700Bold",
    color: "#fff",
    fontSize: 16,
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
});
