import { FunctionComponent, ReactElement } from 'react';
import { IconNamesType, IconProps } from './Icons.types';
import * as Icons from '../icons';
import { useStyles } from 'react-native-unistyles';

export const Icon: FunctionComponent<IconProps> = ({
  name,
  transform,
  color,
  height,
  width,
  ...rest
}: IconProps): ReactElement<IconProps> => {
  const Component = Icons[name as unknown as IconNamesType];
  const { theme } = useStyles();
  color = color || theme.colors.icon.default;
  height = height || theme.size.icon.md;
  width = width || theme.size.icon.md;
  return (
    <Component
      {...rest}
      transform={transform}
      color={color}
      height={height}
      width={width}
    />
  );
};
