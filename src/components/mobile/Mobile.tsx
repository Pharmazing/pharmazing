import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { styles } from "../../utils/appStyles/styles";
import { useGetAllUsersLazyQuery } from "../../generated/graphql";

export default function MobileApp() {
  const [getAllUsersTrigger, { loading, error, data }] =
    useGetAllUsersLazyQuery({
      variables: {},
    });
  return (
    <View style={styles.container}>
      <Text>Open up Mobile.tsx to start working on your app!</Text>
      <Text>{process.env.EXPO_PUBLIC_API_KEY}</Text>
      <Button
        title="Getallusers"
        disabled={loading}
        onPress={() => getAllUsersTrigger()}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      <Text>{JSON.stringify(data)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
