import { TextInput } from 'react-native';
import { CustomInputProps } from './CustomInput.types';
import { Controller } from 'react-hook-form';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { customInputStyles } from './CustomInput.styles';
import { useStyles } from 'react-native-unistyles';

export const CustomInput = ({
  watch,
  control,
  textColor,
  errorTextColor,
  name,
  rules,
  label,
  style,
  ...rest
}: CustomInputProps) => {
  const { styles, theme } = useStyles(customInputStyles);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        // console.warn7('fieldState', error);
        return (
          <Box style={[style]}>
            {label && (
              <Typography style={{ color: textColor || theme.colors.Blue900 }}>
                {label}
              </Typography>
            )}
            <TextInput
              style={[styles.input({ textColor }), style]}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              {...rest}
            />
            {
              <Typography
                size="sm"
                style={{ color: errorTextColor || theme.colors.Red400 }}
              >
                {error?.message}
              </Typography>
            }
          </Box>
        );
      }}
      rules={rules}
    />
  );
};
