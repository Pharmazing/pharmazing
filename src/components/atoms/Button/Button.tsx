import React from 'react';
import { useStyles } from 'react-native-unistyles';
import DropShadow from 'react-native-drop-shadow';
import { ButtonProps } from './Button.types';
import { buttonStyles } from './Button.styles';
import { TouchableOpacity } from 'react-native';
import { Typography } from '../Typography';

export const Button = ({
  btnVariant,
  title,
  style,
  icon,
  textStyle,
  shadowRadius,
  renderShadow = true,
  ...rest
}: ButtonProps) => {
  const { styles, theme } = useStyles(buttonStyles);

  switch (btnVariant) {
    case 'primary':
      return (
        <DropShadow style={styles.shadow({ shadowRadius, renderShadow })}>
          <TouchableOpacity style={[styles.primary, style]} {...rest}>
            <Typography size="md" style={[styles.textStyle, textStyle]}>
              {title}
            </Typography>
            {icon}
          </TouchableOpacity>
        </DropShadow>
      );
    case 'secondary':
      return (
        <DropShadow style={styles.shadow({ shadowRadius, renderShadow })}>
          <TouchableOpacity style={[styles.secondary, style]} {...rest}>
            <Typography
              size="md"
              style={[
                styles.textStyle,
                { color: theme.colors.Green700 },
                textStyle,
              ]}
            >
              {title}
            </Typography>
            {icon}
          </TouchableOpacity>
        </DropShadow>
      );
    case 'danger':
      return (
        <DropShadow style={styles.shadow({ shadowRadius, renderShadow })}>
          <TouchableOpacity style={[styles.danger, style]} {...rest}>
            <Typography size="md" style={[styles.textStyle, textStyle]}>
              {title}
            </Typography>
            {icon}
          </TouchableOpacity>
        </DropShadow>
      );
    default:
      return (
        <TouchableOpacity style={[styles.primary, style]} {...rest}>
          {title}
        </TouchableOpacity>
      );
  }
};
