import { SvgProps } from 'react-native-svg';
import * as Icons from '../icons';

export type IconNamesType = keyof typeof Icons;

export interface IconProps extends SvgProps {
  name: IconNamesType;
  rotation?: number;
}
