import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../../utils/appStyles/styles";
import { Link } from "expo-router";

export default function WebApp() {
  return (
    <View style={styles.container}>
      <Text>Open up Web.tsx to start working on your app!</Text>
      <Link href="/activity">Activity</Link>
      <StatusBar style="auto" />
    </View>
  );
}
