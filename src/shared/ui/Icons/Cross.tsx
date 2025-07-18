import Svg, { Path, type SvgProps } from 'react-native-svg';

const CrossIcon = ({ color, ...props }: SvgProps) => (
  <Svg width={22} height={22} fill={color} {...props}>
    <Path
      fillRule='evenodd'
      d='M7.172 5.05A1.5 1.5 0 0 0 5.05 7.172L8.878 11 5.05 14.828a1.5 1.5 0 1 0 2.122 2.122L11 13.12l3.828 3.829a1.5 1.5 0 1 0 2.121-2.122L13.121 11l3.828-3.828a1.5 1.5 0 1 0-2.121-2.122L11 8.88 7.172 5.05Z'
      clipRule='evenodd'
    />
  </Svg>
);

export default CrossIcon;
