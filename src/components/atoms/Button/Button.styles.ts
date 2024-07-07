import { StyleSheet } from "react-native";
import { styled, Button } from "tamagui";

export const buttonStyles = StyleSheet.create({
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
  },
});

export const PrimaryButton = styled(Button, {
  ...buttonStyles.primary,
});

export const SecondaryButton = styled(Button, {
  ...buttonStyles.secondary,
});

export const DangerButton = styled(Button, {
  ...buttonStyles.danger,
});
