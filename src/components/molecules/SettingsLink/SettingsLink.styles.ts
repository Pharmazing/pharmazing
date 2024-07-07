import { XStack, styled } from "tamagui";
import { StyleSheet } from "react-native";

export const StyledLinkContainer = styled(XStack, {
  borderWidth: 2,
  borderColor: "red",
  alignItems: "center",
  flex: 1,
  height: 40,
  justifyContent: "flex-start",
});

export const settingsLinkStyles = StyleSheet.create({
  textStyle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});
