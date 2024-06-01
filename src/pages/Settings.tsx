import { router } from "expo-router";
import { Button, Text } from "react-native";
import { useSession } from "../utils/context";

export default function Settings() {
  const { signOut } = useSession();
  const logout = () => {
    signOut();
    router.replace("signin");
  };
  return (
    <>
      <Text>Settings Page</Text>
      <Button title={"Sign out"} onPress={logout} />
    </>
  );
}
