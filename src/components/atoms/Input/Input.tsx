import React, { useRef } from "react";
import { Animated, Keyboard, TextInput, View, Text } from "react-native";
import { TextInputProps } from "./Input.types";
import OutsidePressHandler from "react-native-outside-press";
import { useStyles } from "react-native-unistyles";
import { textInputStyles } from "./Input.styles";
import { Controller } from "react-hook-form";

export const AnimatedInputField = ({
  label,
  name,
  control,
  watch,
  rules,
  ...rest
}: TextInputProps) => {
  const value = watch(name);
  // const value = control._formValues[name];
  const { styles } = useStyles(textInputStyles);
  const floatingLabelAnimation = useRef(
    new Animated.Value(value ? 1 : 0),
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
      outputRange: [10, -5], // top value
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // font size
    }),
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <OutsidePressHandler onOutsidePress={() => Keyboard.dismiss()}>
              {label && (
                <Animated.Text style={[styles.label, floatingLabelStyle]}>
                  {label}
                </Animated.Text>
              )}
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onFocus={handleFocus}
                onBlur={() => {
                  onBlur();
                  handleBlurDefault();
                }}
                {...rest}
              />
              {<Text style={{ color: "red" }}>{error?.message}</Text>}
            </OutsidePressHandler>
          );
        }}
        name={name}
        rules={rules}
      />
    </View>
  );
};
