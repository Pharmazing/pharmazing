import { Switch } from 'react-native';
import { ToggleProps } from './Toggle.types';

export const Toggle = ({ value, onValueChange, ...rest }: ToggleProps) => {
  // const toggleSwitch = () => onValueChange ? onValueChange(previousState => !previousState);
  return <Switch value={value} onValueChange={onValueChange} {...rest} />;
};
