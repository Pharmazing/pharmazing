import { ButtonProps as RNButtonProps } from "tamagui";
export enum ButtonVariantEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}

export interface ButtonProps extends RNButtonProps {
  btnVariant: ButtonVariantEnum;
  title: string;
}
