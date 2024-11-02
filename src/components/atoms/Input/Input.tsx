import React, { useRef } from 'react';
import { Animated, Keyboard, TextInput, View } from 'react-native';
import { InputProps } from './Input.types';
import OutsidePressHandler from 'react-native-outside-press';
import { useStyles } from 'react-native-unistyles';
import { textInputStyles } from './Input.styles';
import { Controller } from 'react-hook-form';
import { Typography } from '../Typography';
import { Toggle } from '../Toggle';
import { Box } from '../Box';

export const AnimatedInputField = ({
  label,
  name,
  control,
  watch,
  errorTextColor,
  rules,
  textColor,
  type = 'text',
  ...rest
}: InputProps) => {
  const value = watch(name);

  const { styles, theme } = useStyles(textInputStyles);
  const floatingLabelAnimation = useRef(
    new Animated.Value(value ? 1 : 0)
  ).current;

  const handleFocus = () => {
    // Animate the label up and reduce its size when input is focus
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlurDefault = () => {
    // If the input is empty, animate the floating label back to its original position
    if (!value) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  //   Define animated styles for the floating label
  const floatingLabelStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -18], // top value
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14], // font size
    }),
  };

  const renderComponent = () => {
    switch (type) {
      case 'text':
        return (
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <OutsidePressHandler onOutsidePress={() => Keyboard.dismiss()}>
                  {label && (
                    <Animated.Text
                      style={[styles.label({ textColor }), floatingLabelStyle]}
                    >
                      {label}
                    </Animated.Text>
                  )}
                  <TextInput
                    autoCapitalize="none"
                    style={styles.input({ textColor })}
                    value={value}
                    onChangeText={onChange}
                    onFocus={handleFocus}
                    onBlur={() => {
                      onBlur();
                      handleBlurDefault();
                    }}
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
                </OutsidePressHandler>
              );
            }}
            name={name}
            rules={rules}
          />
        );
      case 'toggle':
        return (
          <Controller
            name={name}
            rules={rules}
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <Box
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography size="lg" weight="500">
                    {label}
                  </Typography>
                  <Toggle value={value} onValueChange={onChange} {...rest} />
                </Box>
              );
            }}
          />
        );
    }
  };

  return <View style={styles.container}>{renderComponent()}</View>;
};
