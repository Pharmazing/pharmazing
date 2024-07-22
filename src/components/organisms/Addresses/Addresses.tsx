import { Text } from "react-native";
import { useSession } from "../../../utils/context";
import { Box, ScrollBox } from "../../atoms";

import { SwipeListView } from "react-native-swipe-list-view";

export function Addresses() {
  const { session } = useSession();
  const parsedSession = JSON.parse(session || "{}");
  parsedSession?.user?.address.forEach((addy: any) => console.log(addy));
  return (
    <>
      <SwipeListView
        data={parsedSession?.user?.address || []}
        renderItem={({ item }: any) => {
          // console.log('from list', item)
          return (
            <Box>
              <Text>{item.addressLine1}</Text>
              <Box style={{ display: "flex", flexDirection: "row" }}>
                <Text>{item.addressLine2}</Text>
                <Text>{item.city}</Text>
                <Text>{item.parish}</Text>
                <Text>{item.country}</Text>
              </Box>
            </Box>
          );
        }}
        renderHiddenItem={(data, rowMap) => {
          console.log("from hidden", data, rowMap);
          return <Text>Hidden</Text>;
        }}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </>
  );
}
