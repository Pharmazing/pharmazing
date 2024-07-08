import Svg, { G, Path, Defs, Rect, SvgProps, ClipPath } from "react-native-svg";

export default function ChevronRight({
  color,
  height = 24,
  width = 24,
  ...rest
}: SvgProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      fill="none"
      {...rest}
    >
      <G clip-path="url(#clip0_537_59)">
        <Path
          d="M9.29006 6.70978C8.90006 7.09978 8.90006 7.72978 9.29006 8.11978L13.1701 11.9998L9.29006 15.8798C8.90006 16.2698 8.90006 16.8998 9.29006 17.2898C9.68006 17.6798 10.3101 17.6798 10.7001 17.2898L15.2901 12.6998C15.6801 12.3098 15.6801 11.6798 15.2901 11.2898L10.7001 6.69978C10.3201 6.31978 9.68006 6.31978 9.29006 6.70978Z"
          fill={color || "#5F6368"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_537_59">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
