import { BlurView } from 'expo-blur';
import { Box, Button, ButtonVariantEnum } from '../../atoms';
import { useStyles } from 'react-native-unistyles';
import { AnimatedInputField } from '../../atoms/Input';
import { useForm } from 'react-hook-form';
import { signupStyles } from './SignUp.styles';
import { SignUpProps } from './SignUp.types';
import { emailRegex } from '../../../utils';

export const SignUp = ({ onSubmit, userCreated }: SignUpProps) => {
  const { styles } = useStyles(signupStyles);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSignUp = () => {
    onSubmit?.({
      email: control._formValues.email,
      password: control._formValues.password,
    });
  };

  return (
    <Box style={styles.container}>
      <BlurView intensity={100} style={styles.blurView} tint="dark">
        <Box style={{ width: '100%' }}>
          <AnimatedInputField
            watch={watch}
            control={control}
            name="email"
            type="text"
            label="Email"
            textColor="white"
            rules={{
              required: `Email is required`,
              validate: (val) => {
                if (!emailRegex.test(val)) {
                  return 'Invalid email address';
                }
                return true;
              },
            }}
          />

          <AnimatedInputField
            watch={watch}
            control={control}
            name="password"
            type="text"
            label="Password"
            secureTextEntry
            textColor="white"
            rules={{ required: `Password is required` }}
          />
        </Box>
        <Button
          btnVariant={ButtonVariantEnum.PRIMARY}
          title="Sign Up"
          onPress={handleSubmit(onSignUp)}
          style={{ margin: 0 }}
        />
      </BlurView>
    </Box>
  );
};
