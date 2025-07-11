import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';

export function MapIcon({ color, height, width, ...rest }: SvgProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <G clip-path="url(#clip0_537_45)">
        <Path
          d="M14.65 4.97999L9.65 3.22999C9.23 3.07999 8.77 3.07999 8.35 3.21999L4.36 4.55999C3.55 4.83999 3 5.59999 3 6.45999V18.31C3 19.72 4.41 20.68 5.72 20.17L8.65 19.03C8.87 18.94 9.12 18.94 9.34 19.02L14.34 20.77C14.76 20.92 15.22 20.92 15.64 20.78L19.63 19.44C20.44 19.17 20.99 18.4 20.99 17.54V5.68999C20.99 4.27999 19.58 3.31999 18.27 3.82999L15.34 4.96999C15.12 5.04999 14.88 5.05999 14.65 4.97999ZM15 18.89L9 16.78V5.10999L15 7.21999V18.89Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_537_45">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
