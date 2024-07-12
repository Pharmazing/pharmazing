import { ActivityIndicator, View } from "react-native";
import { LoadingIndicatorProps } from "./LoadingIndicator.types";
import { loadingStyles } from "./LoadingIndicator.styles";
import { useStyles } from "react-native-unistyles";

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const { styles } = useStyles(loadingStyles);
  return (
    <View style={styles.loading}>
      <ActivityIndicator color="#345ABB" size="large" {...props} />
    </View>
  );
};
