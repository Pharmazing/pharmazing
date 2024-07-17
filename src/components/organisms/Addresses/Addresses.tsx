import { Text } from "react-native";
import { useSession } from "../../../utils/context";

export function Addresses() {
  const { session } = useSession();
  const parsedSession = JSON.parse(session || "{}");
  console.log("parsedSession", parsedSession?.user);
  return <Text>Addresses</Text>;
}
