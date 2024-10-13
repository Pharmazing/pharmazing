import React from 'react';
import { Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import DropShadow from 'react-native-drop-shadow';
import { ButtonProps } from './Button.types';
import { buttonStyles } from './Button.styles';

import { TouchableOpacity } from 'react-native';
import { Icon } from '../Icon';

export const Button = ({
  btnVariant,
  title,
  style,
  textColor = 'white',
  renderIcon = false,
  ...rest
}: ButtonProps) => {
  const { styles } = useStyles(buttonStyles);
  switch (btnVariant) {
    case 'primary':
      return <TouchableOpacity {...rest}>{title}</TouchableOpacity>;
    case 'secondary':
      return <TouchableOpacity {...rest}>{title}</TouchableOpacity>;
    case 'danger':
      return (
        <DropShadow style={styles.shadow}>
          <TouchableOpacity style={[styles.danger, style]} {...rest}>
            <Text style={styles.textStyle({ color: textColor })}>{title}</Text>
            {renderIcon && (
              <Icon name="CartIcon" color={textColor} height={20} width={20} />
            )}
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
