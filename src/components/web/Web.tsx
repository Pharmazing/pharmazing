import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../../utils/appStyles/styles";

export default function WebApp() {
  return (
    <View style={styles.container}>
      <Text>Open up Web.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
