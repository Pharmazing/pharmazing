import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../../utils/appStyles/styles";

export default function WebApp() {
  return (
    <View style={styles.container}>
      <Text>Open up Web.tsx to start working on your app!</Text>
      <Text>{process.env.EXPO_PUBLIC_API_KEY}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
