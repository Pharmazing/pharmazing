import React, { useMemo } from "react";
import { useSession } from "../../../utils/context";
import { Button, ButtonVariantEnum, ScrollBox } from "../../atoms";
import { SettingsBox } from "../../molecules";

export default function SettingsMobile() {
  const { signOut, session } = useSession();
  const parsedSession = JSON.parse(session || "{}");
  const userId = useMemo(
    () => parsedSession?.user?.userId || "",
    [session, parsedSession],
  );
  console.log("userId", userId);
  console.log("parsedSession", parsedSession);
  return (
    <ScrollBox
      contentContainerStyle={{
        display: "flex",
        alignItems: "center",
        padding: 16,
        flexGrow: 1,
      }}
    >
      {userId && (
        <SettingsBox
          title="Profile"
          settingLinks={[
            {
              content: "Personal Info",
              icon: "PersonIcon",
              href: `/personalinfo/${userId || "1"}`,
              // disabled: !userId,
            },
            {
              content: "Notifications",
              icon: "MapIcon",
              href: "/cart",
              disabled: !userId,
            },
            {
              content: "Addresses",
              icon: "MapIcon",
              href: "/cart",
              disabled: !userId,
            },
          ]}
        />
      )}
      <Button
        btnVariant={ButtonVariantEnum.DANGER}
        title={"Logout"}
        onPress={signOut}
      />
    </ScrollBox>
  );
}
