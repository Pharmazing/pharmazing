import Svg, { Path, SvgProps } from 'react-native-svg';

export const PlusIcon = ({ color, width, height, ...rest }: SvgProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      {...rest}
    >
      <Path
        d="M5 9L5 1"
        stroke={color}
        stroke-width="6"
        stroke-linecap="round"
      />
      <Path d="M1 5H9" stroke={color} stroke-width="6" stroke-linecap="round" />
    </Svg>
  );
};
