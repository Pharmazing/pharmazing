import React from "react";
import { useSession } from "../../../utils/context";
import { Button, ButtonVariantEnum } from "../../atoms";
import { ScrollView } from "tamagui";
import { SettingsBox } from "../../molecules";

export default function SettingsMobile() {
  const { signOut } = useSession();
  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        alignItems: "center",
        padding: 16,
        flexGrow: 1,
      }}
    >
      <SettingsBox
        title="Profile"
        settingLinks={[
          { content: "Personal Info", icon: "PersonIcon", href: "/cart" },
          { content: "Addresses", icon: "MapIcon", href: "/cart" },
        ]}
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
