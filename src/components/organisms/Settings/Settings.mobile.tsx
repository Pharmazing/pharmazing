import React from "react";
import { useSession } from "../../../utils/context";
import { Box, Button, ButtonVariantEnum } from "../../atoms";
import { ScrollView, Text } from "tamagui";
import { SettingsLink } from "../../molecules";

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
      <Box
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 24,
          flexDirection: "column",
          backgroundColor: "#EFEFEF",
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto_700Bold",
            fontSize: 24,
            marginBottom: 16,
          }}
        >
          Profile
        </Text>
        <SettingsLink
          content={"Personal Info"}
          href={"/cart"}
          icon="PersonIcon"
          style={{ marginBottom: 16 }}
        />
        <SettingsLink icon="MapIcon" content={"Addresses"} href={"/cart"} />
      </Box>
      <Button
        btnVariant={ButtonVariantEnum.DANGER}
        title={"Logout"}
        onPress={signOut}
        width={"$16"}
      />
    </ScrollView>
  );
}
