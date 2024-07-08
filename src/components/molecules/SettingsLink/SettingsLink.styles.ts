import { XStack, styled } from "tamagui";
import { StyleSheet } from "react-native";

export const StyledLinkContainer = styled(XStack, {
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
});

export const settingsLinkStyles = StyleSheet.create({
  textStyle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
  },
});
