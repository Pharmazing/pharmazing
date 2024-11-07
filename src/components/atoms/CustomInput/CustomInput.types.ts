import { Control, ControllerProps, UseFormWatch } from 'react-hook-form';
import { TextInputProps } from 'react-native';

export type CustomInputProps = TextInputProps & {
  control: Control<any, any>;
  name: string;
  rules?: ControllerProps['rules'];
  errorTextColor?: string;
  textColor?: string;
  watch: UseFormWatch<any>;
  label?: string;
};
