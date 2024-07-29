import { useSession } from "../../../utils/context";
import { Box } from "../../atoms";
import { AddressList } from "../../molecules";

export function Addresses() {
  const { session } = useSession();
  const parsedSession = JSON.parse(session || "{}");
  parsedSession?.user?.address?.forEach((addy: any) => console.log(addy));
  return (
    <Box style={{ flex: 1 }}>
      <AddressList />
    </Box>
  );
}
