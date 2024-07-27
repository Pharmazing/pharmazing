import { createStyleSheet } from "react-native-unistyles";

export const textInputStyles = createStyleSheet((theme) => ({
  container: {
    marginBottom: 16,
    marginHorizontal: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: theme.colors.black,
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
}));
