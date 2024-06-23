import { Button, Text } from "react-native";
import { useSession } from "../utils/context";

export default function SettingsLayout() {
  const { signOut } = useSession();
  return (
    <>
      <Text>Settings Page</Text>
      <Button title={"Sign out"} onPress={signOut} />
    </>
  );
}
