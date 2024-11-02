// import { ReactNode } from 'react';
import { Control, ControllerProps, UseFormWatch } from 'react-hook-form';
import { StyleProp, TextInputProps, TextStyle } from 'react-native';
import { ToggleProps } from '../Toggle';

export interface InputProps
  extends Pick<
    TextInputProps,
    'keyboardType' | 'maxLength' | 'secureTextEntry'
  > {
  label?: string;
  control: Control<any, any>;
  name: string;
  textColor?: string;
  watch: UseFormWatch<any>;
  errorTextColor?: string;
  rules?: ControllerProps['rules'];
  type?: 'text' | 'toggle' | 'password';
  style?: StyleProp<TextStyle> | ToggleProps['style'];
}
