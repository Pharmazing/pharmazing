import { ButtonProps } from "./Button.types";
import { DangerButton, PrimaryButton, SecondaryButton } from "./Button.styles";
import { Text } from "tamagui";
import DropShadow from "react-native-drop-shadow";

export const Button = ({ btnVariant, title, ...rest }: ButtonProps) => {
  switch (btnVariant) {
    case "primary":
      return <PrimaryButton {...rest}>{title}</PrimaryButton>;
    case "secondary":
      return <SecondaryButton {...rest}>{title}</SecondaryButton>;
    case "danger":
      return (
        <DropShadow
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
          }}
        >
          <DangerButton {...rest}>
            <Text
              style={{
                fontFamily: "Roboto_700Bold",
                color: "#fff",
                fontSize: 16,
                opacity: 1,
              }}
            >
              {title}
            </Text>
          </DangerButton>
        </DropShadow>
      );
    default:
      return <PrimaryButton {...rest}>{title}</PrimaryButton>;
  }
};
