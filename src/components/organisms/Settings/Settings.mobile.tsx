import React from "react";
import { ScrollView, Text } from "react-native";
import { useSession } from "../../../utils/context";
import { Button, ButtonVariantEnum } from "../../atoms";

export default function SettingsMobile() {
  const { signOut } = useSession();
  return (
    <ScrollView>
      <Text>Settings Page</Text>
      <Button
        btnVariant={ButtonVariantEnum.DANGER}
        title={"Sign out"}
        onPress={signOut}
      />
    </ScrollView>
  );
}
