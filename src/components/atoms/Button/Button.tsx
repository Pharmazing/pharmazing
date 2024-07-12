import React from "react";
import { Text } from "react-native";
import { useStyles } from "react-native-unistyles";
import DropShadow from "react-native-drop-shadow";
import { ButtonProps } from "./Button.types";
import { buttonStyles } from "./Button.styles";

import { TouchableOpacity } from "react-native";

export const Button = ({ btnVariant, title, ...rest }: ButtonProps) => {
  const { styles } = useStyles(buttonStyles);
  switch (btnVariant) {
    case "primary":
      return <TouchableOpacity {...rest}>{title}</TouchableOpacity>;
    case "secondary":
      return <TouchableOpacity {...rest}>{title}</TouchableOpacity>;
    case "danger":
      return (
        <DropShadow style={styles.shadow}>
          <TouchableOpacity style={styles.danger} {...rest}>
            <Text style={styles.textStyle}>{title}</Text>
          </TouchableOpacity>
        </DropShadow>
      );
    default:
      return (
        <TouchableOpacity style={styles.primary} {...rest}>
          {title}
        </TouchableOpacity>
      );
  }
};
