import { ActivityIndicator, View } from "react-native";
import { LoadingIndicatorProps } from "./LoadingIndicator.types";
import { loadingStyles } from "./LoadingIndicator.styles";
import { useStyles } from "react-native-unistyles";

export const LoadingIndicator = ({
  loading,
  ...rest
}: LoadingIndicatorProps) => {
  const { styles } = useStyles(loadingStyles);
  return (
    loading && (
      <View style={styles.loading}>
        <ActivityIndicator color="#345ABB" size="large" {...rest} />
      </View>
    )
  );
};
