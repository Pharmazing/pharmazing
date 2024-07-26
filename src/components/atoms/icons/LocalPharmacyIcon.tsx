import Svg, { SvgProps, Path } from "react-native-svg";
import { useStyles } from "react-native-unistyles";

export function LocalPharmacyIcon({ color, height, width, ...rest }: SvgProps) {
  const { theme } = useStyles();
  color = color || theme.colors.tabBarIcon.default;
  return (
    <Svg
      height={height || 32}
      viewBox="0 -960 960 960"
      width={width || 32}
      fill={color}
      {...rest}
    >
      <Path d="M160-160v-33.85L241.54-440 160-686.15V-720h483.38l53.39-147.69 41.69 15.54L690.92-720H800v33.85L718.46-440 800-193.85V-160H160Zm300-147.69h40V-420h112.31v-40H500v-112.31h-40V-460H347.69v40H460v112.31ZM204-200h552l-80-240 80-240H204l80 240-80 240Zm276-240Z" />
    </Svg>
  );
}
