import React from "react";
import { useSession } from "../../../utils/context";
import { Box, Button, ButtonVariantEnum } from "../../atoms";
import { ScrollView, Text } from "tamagui";

export default function SettingsMobile() {
  const { signOut } = useSession();
  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Settings Page</Text>
      <Box
        style={{
          width: "100%",
          display: "flex",
          height: 200,
          borderRadius: 24,
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#EFEFEF",
        }}
      />
      <Button
        btnVariant={ButtonVariantEnum.DANGER}
        title={"Logout"}
        onPress={signOut}
        width={"$16"}
      />
    </ScrollView>
  );
}
