import Svg, { Path, SvgProps } from "react-native-svg";

export const TrashIcon = ({
  color,
  height = 24,
  width = 24,
  ...rest
}: SvgProps) => {
  return (
    <Svg
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={color || "#e8eaed"}
    >
      <Path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
    </Svg>
  );
};
