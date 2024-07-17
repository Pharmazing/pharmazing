import { Text } from "react-native";
import { AnimatedInputField } from "../../atoms/Input";
import {
  Button,
  ButtonVariantEnum,
  LoadingIndicator,
  ScrollBox,
} from "../../atoms";
import { useForm } from "react-hook-form";
import { useSession } from "../../../utils/context";
import { useEditUserMutation } from "../../../generated/graphql";
import { useToast } from "../../../utils/hooks/useToast";
import { router } from "expo-router";

export default function PersonalInfo() {
  const { session, setSession } = useSession();
  const { showToast: showSuccessToast } = useToast({
    type: "success",
    text1: "Success",
    text2: "User updated successfully",
  });
  const { showToast: showErrorToast } = useToast({
    type: "error",
    text1: "Error",
    text2: "User update failed",
  });
  const parsedSession = JSON.parse(session || "{}");

  const userId = parsedSession?.user?.userId || "";
  const { control, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      firstName: parsedSession?.user?.givenName || "",
      lastName: parsedSession?.user?.familyName || "",
      email: parsedSession?.user?.email || "",
      age: parsedSession?.user?.age?.toString() || null,
    },
  });

  const [triggerEditUser, { data, loading, error }] = useEditUserMutation({
    variables: {
      user: {
        userId,
        email: control._formValues.email,
        firstName: control._formValues.firstName,
        lastName: control._formValues.lastName,
        age: parseInt(control._formValues.age) || 0,
      },
    },
    onCompleted: (data) => {
      setSession(
        JSON.stringify({
          ...{
            ...parsedSession,
            user: {
              ...parsedSession.user,
              email: data?.editUser?.email,
              givenName: data?.editUser?.firstName,
              familyName: data?.editUser?.lastName,
              age: data?.editUser?.age,
            },
          },
        }),
      );
      showSuccessToast();
      router.back();
    },
    onError: (error) => {
      showErrorToast();
    },
  });

  const onSave = () => {
    console.log(control._formValues);
    triggerEditUser();
  };

  return (
    <ScrollBox contentContainerStyle={{ flex: 1 }}>
      <Text style={{ alignSelf: "center" }}>Personal Info</Text>

      <AnimatedInputField
        watch={watch}
        label="First Name"
        name="firstName"
        control={control}
        rules={{ required: `First name is required` }}
      />

      <AnimatedInputField
        watch={watch}
        label="Last Name"
        name="lastName"
        control={control}
        rules={{ required: `Last name is required` }}
      />
      <AnimatedInputField
        watch={watch}
        label="Email"
        name="email"
        control={control}
        rules={{ required: `Email is required` }}
      />
      <AnimatedInputField
        watch={watch}
        label="Age"
        name="age"
        control={control}
        rules={{
          required: `Age is required`,
          pattern: { value: /^[0-9]*$/, message: "Age must be a number" },
        }}
        keyboardType="numeric"
        maxLength={2}
      />
      <Button
        disabled={!formState.isDirty}
        style={{ alignSelf: "center" }}
        btnVariant={ButtonVariantEnum.DANGER}
        title="Save"
        onPress={handleSubmit(onSave)}
      />
      <LoadingIndicator loading={loading} />
    </ScrollBox>
  );
}
