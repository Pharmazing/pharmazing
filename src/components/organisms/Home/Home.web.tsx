import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { styles } from "../../../utils/appStyles/styles";
import { useGetAllUsersLazyQuery } from "../../../generated/graphql";
import { useSession } from "../../../utils/context";
import { router } from "expo-router";

export function HomeWeb() {
  const { session } = useSession();
  const [getAllUsersTrigger, { loading, error, data }] =
    useGetAllUsersLazyQuery({
      variables: {},
    });
  return (
    <View style={styles.container}>
      <Button title={"Sign out"} onPress={() => router.replace("/signin")} />
      <Text>Open up Web.tsx to start working on your app!</Text>
      <Text>{process.env.EXPO_PUBLIC_API_URL}</Text>
      <StatusBar style="auto" />
      <Button
        title="Getallusers"
        disabled={loading}
        onPress={() => getAllUsersTrigger()}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      {session && <Text>{JSON.stringify(session)}</Text>}
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
