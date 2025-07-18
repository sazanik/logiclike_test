import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';

const ChevronIcon = ({ color, ...props }: SvgProps) => (
  <Svg width={18} height={18} fill='none' {...props}>
    <Circle cx={9} cy={9} r={9} fill='#000' fillOpacity={0.2} />
    <Path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M5.539 7.615 9 11.077l3.462-3.462'
    />
  </Svg>
);

export default ChevronIcon;
