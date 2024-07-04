import React from "react";
import { useSession } from "../../../utils/context";
import { Button, ButtonVariantEnum } from "../../atoms";
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
      <Button
        btnVariant={ButtonVariantEnum.DANGER}
        title={"Logout"}
        onPress={signOut}
        width={"$16"}
      />
    </ScrollView>
  );
}
