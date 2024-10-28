import Svg, { Path, SvgProps } from "react-native-svg";

export default function AppleIcon(props: SvgProps) {
  return (
    <Svg fill="none" {...props}>
      <Path
        fill="#fff"
        d="M17.55 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C3.29 15.25 4.01 7.59 9.55 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01ZM12.53 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"
      />
    </Svg>
  );
}
