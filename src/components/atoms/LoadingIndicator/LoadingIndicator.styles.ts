import { createStyleSheet } from "react-native-unistyles";

export const loadingStyles = createStyleSheet({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // flex: 1,
    // zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B9B9B995",
  },
});
