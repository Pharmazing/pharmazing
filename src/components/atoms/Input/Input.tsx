import React, { useRef } from "react";
import { Animated, Keyboard, TextInput, View } from "react-native";
import { TextInputProps } from "./Input.types";
import OutsidePressHandler from "react-native-outside-press";
import { useStyles } from "react-native-unistyles";
import { textInputStyles } from "./Input.styles";

export const AnimatedInputField = ({
  label,
  value,
  handleChange,
  handleError,
}: TextInputProps) => {
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
      <OutsidePressHandler onOutsidePress={() => Keyboard.dismiss()}>
        {label && (
          <Animated.Text style={[styles.label, floatingLabelStyle]}>
            {label}
          </Animated.Text>
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlurDefault}
        />
      </OutsidePressHandler>
    </View>
  );
};
