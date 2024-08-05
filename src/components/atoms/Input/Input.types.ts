import { Control, ControllerProps, UseFormWatch } from 'react-hook-form';
import { TextInputProps as TextInputComponentProps } from 'react-native';
export interface TextInputProps extends TextInputComponentProps {
  label?: string;
  control: Control<any, any>;
  name: string;
  watch: UseFormWatch<any>;
  rules?: ControllerProps['rules'];
  type?: 'text' | 'toggle';
}
