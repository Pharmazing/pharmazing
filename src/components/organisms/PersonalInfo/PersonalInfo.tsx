import { AnimatedInputField } from '../../atoms/Input';
import {
  Button,
  ButtonVariantEnum,
  LoadingIndicator,
  ScrollBox,
  Typography,
} from '../../atoms';
import { useForm } from 'react-hook-form';
import { useUser } from '../../../utils/context';
import { useEditUserMutation } from '../../../generated/graphql';
import { useToast } from '../../../utils';
import { router } from 'expo-router';

export function PersonalInfo() {
  // const { session, setSession } = useSession();
  const { updateUser, user } = useUser();
  const { showToast } = useToast();

  const userId = user?.userId || '';
  const { control, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      age: user?.age?.toString() || null,
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
      updateUser({
        email: data?.editUser?.email,
        firstName: data?.editUser?.firstName,
        lastName: data?.editUser?.lastName,
        age: data?.editUser?.age,
        // address: data?.editUser?.address || [],
      });
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'User updated successfully',
      });
      router.back();
    },
    onError: (error) => {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'User update failed',
      });
    },
  });

  const onSave = () => {
    console.log(control._formValues);
    triggerEditUser();
  };

  return (
    <ScrollBox
      contentContainerStyle={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
      }}
    >
      <AnimatedInputField
        watch={watch}
        label="First Name"
        name="firstName"
        control={control}
        // style={{ marginTop:  }}
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
          pattern: {
            value: /^[0-9]*$/,
            message: 'Age must be a number',
          },
        }}
        keyboardType="numeric"
        maxLength={2}
      />
      <Button
        disabled={!formState.isDirty}
        style={{ alignSelf: 'center' }}
        btnVariant={ButtonVariantEnum.SECONDARY}
        title="Save"
        onPress={handleSubmit(onSave)}
      />
      <LoadingIndicator loading={loading} />
    </ScrollBox>
  );
}
