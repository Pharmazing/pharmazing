import Svg, { Path, SvgProps } from "react-native-svg";
import { useStyles } from "react-native-unistyles";

export function LocationIcon({
  color,
  height = 24,
  width = 24,
  ...rest
}: SvgProps) {
  const { theme } = useStyles();
  color = color || theme.colors.icon.default;
  return (
    <Svg
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={color}
      {...rest}
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </Svg>
  );
}
