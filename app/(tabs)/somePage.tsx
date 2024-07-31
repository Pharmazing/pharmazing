import React from 'react';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
const somePageStyles = createStyleSheet({
  text: {
    color: {
      xs: 'red',
      sm: 'green',
      // md: "blue",
      // lg: "purple",
      xl: 'orange',
    },
  },
});

export default function Page() {
  const { styles } = useStyles(somePageStyles);
  return <Text style={styles.text}>Some page</Text>;
}
