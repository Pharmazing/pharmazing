import { createStyleSheet } from "react-native-unistyles";

export const textInputStyles = createStyleSheet({
  container: {
    marginBottom: 16,
    marginHorizontal: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto_400Regular",
  },
  label: {
    paddingLeft: 10,
    position: "absolute",
    fontFamily: "Roboto_700Bold",
  },
});
