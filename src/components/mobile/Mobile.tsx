import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import { styles } from "../../utils/appStyles/styles";

export default function MobileApp() {
  return (
    <View style={styles.container}>
      <Text>Open up Mobile.tsx to start working on your app!</Text>
      <Link href="/activity">Activity</Link>
      <StatusBar style="auto" />
    </View>
  );
}
