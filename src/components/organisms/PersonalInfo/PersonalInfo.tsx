import { Text } from "react-native";
import { AnimatedInputField } from "../../atoms/Input";
import { useState } from "react";
import { Box, Button, ButtonVariantEnum } from "../../atoms";

export const PersonalInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <Box>
      <Text style={{ alignSelf: "center" }}>Personal Info</Text>
      <AnimatedInputField
        label="First Name"
        value={firstName}
        handleChange={setFirstName}
      />
      <AnimatedInputField
        label="Last Name"
        value={lastName}
        handleChange={setLastName}
      />
      <Button
        style={{ alignSelf: "center" }}
        btnVariant={ButtonVariantEnum.DANGER}
        title="Save"
        onPress={() => console.log(firstName)}
      />
    </Box>
  );
};
