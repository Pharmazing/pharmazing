import { StatusBar } from "expo-status-bar";
import { Button, Text, ScrollView } from "react-native";
import { styles } from "../../../utils/appStyles/styles";
import { useGetAllUsersLazyQuery } from "../../../generated/graphql";
import { useSession } from "../../../utils/context";

export default function HomeMobile() {
  const [getAllUsersTrigger, { loading, error, data }] =
    useGetAllUsersLazyQuery({
      variables: {},
    });

  const { session } = useSession();
  return (
    <ScrollView style={styles.container}>
      <Text>Open up Mobile.tsx to start working on your app!</Text>
      <Text>{process.env.EXPO_PUBLIC_API_URL}</Text>
      <Button
        title="Getallusers"
        disabled={loading}
        onPress={() => getAllUsersTrigger()}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      {session && <Text>{JSON.stringify(session)}</Text>}
      <Text>{JSON.stringify(data)}</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
