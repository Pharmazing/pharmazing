import { ButtonProps } from "./Button.types";
import { DangerButton, PrimaryButton, SecondaryButton } from "./Button.styles";
import SettingsIcon from "../../../icons/SettingsIcon";

export const Button = ({ btnVariant, title, ...rest }: ButtonProps) => {
  switch (btnVariant) {
    case "primary":
      return <PrimaryButton {...rest}>{title}</PrimaryButton>;
    case "secondary":
      return <SecondaryButton {...rest}>{title}</SecondaryButton>;
    case "danger":
      return (
        <DangerButton iconAfter={<SettingsIcon />} {...rest}>
          {title}
        </DangerButton>
      );
    default:
      return <PrimaryButton {...rest}>{title}</PrimaryButton>;
  }
};
