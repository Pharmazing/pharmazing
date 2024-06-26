import React from "react";
import { Button, ScrollView, Text } from "react-native";
import { useSession } from "../../../utils/context";

export default function SettingsMobile() {
  const { signOut, session } = useSession();
  return (
    <ScrollView>
      <Text>Settings Page</Text>
      {session && <Text>{JSON.stringify(session)}</Text>}
      <Button title={"Sign out"} onPress={signOut} />
    </ScrollView>
  );
}
