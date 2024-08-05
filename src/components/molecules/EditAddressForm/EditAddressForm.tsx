import { useForm } from 'react-hook-form';
import { EditAddressFormProps } from './EditAddressForm.types';
import { Text } from 'react-native';
import { Button, ButtonVariantEnum, ScrollBox } from '../../atoms';
import { editAddressFormStyles } from './EditAddressForm.styles';
import { useStyles } from 'react-native-unistyles';
import { AnimatedInputField } from '../../atoms/Input';
import { useEditAddressMutation } from '../../../generated/graphql';
import { useCallback } from 'react';
export const EditAddressForm = ({ defaultValues }: EditAddressFormProps) => {
  const [triggetEditAddress, { data, loading, error }] = useEditAddressMutation(
    {}
  );
  const { styles } = useStyles(editAddressFormStyles);
  // console.log(defaultValues?.item?.addressLine1);
  const { watch, control, handleSubmit, formState } = useForm({
    defaultValues: {
      addressLine1: defaultValues?.item?.addressLine1,
      addressLine2: defaultValues?.item?.addressLine2 || '',
      city: defaultValues?.item?.city,
      parish: defaultValues?.item?.parish,
      country: defaultValues?.item?.country,
      zip: defaultValues?.item?.zip,
      primary: defaultValues?.item?.primary,
    },
  });
  const onSave = (data: any) => {
    console.log('formstate', control._formValues);
  };

  return (
    <ScrollBox contentContainerStyle={styles.container}>
      <AnimatedInputField
        watch={watch}
        control={control}
        name="addressLine1"
        label="Address Line 1"
        rules={{ required: 'This field is required' }}
      />
      <AnimatedInputField
        watch={watch}
        control={control}
        name="addressLine2"
        label="Address Line 2"
      />
      <AnimatedInputField
        watch={watch}
        control={control}
        name="city"
        label="City"
        rules={{ required: 'This field is required' }}
      />
      <AnimatedInputField
        watch={watch}
        control={control}
        name="parish"
        label="Parish"
        rules={{ required: 'This field is required' }}
      />
      <AnimatedInputField
        watch={watch}
        control={control}
        name="country"
        label="Country"
        rules={{ required: 'This field is required' }}
      />
      <AnimatedInputField
        watch={watch}
        control={control}
        name="zip"
        label="Zip"
        rules={{ required: 'This field is required' }}
      />
      <AnimatedInputField
        type="toggle"
        watch={watch}
        control={control}
        onChange={(val) => !val}
        name="primary"
        label="Primary address"
      />
      <Button
        disabled={!formState.isDirty}
        style={{ alignSelf: 'center' }}
        btnVariant={ButtonVariantEnum.DANGER}
        title="Save"
        onPress={handleSubmit(onSave)}
      />
      {/* <Text>{JSON.stringify(defaultValues)}</Text> */}
    </ScrollBox>
  );
};
