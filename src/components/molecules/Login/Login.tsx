import { BlurView } from 'expo-blur';
import { Box, Button, ButtonVariantEnum, Icon, Typography } from '../../atoms';
import { LoginProps } from './Login.types';
import { useStyles } from 'react-native-unistyles';
import { loginStyles } from './Login.styles';
import { AnimatedInputField } from '../../atoms/Input';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { useSession } from '../../../utils/context';

export const Login = (props: LoginProps) => {
  const { styles } = useStyles(loginStyles);
  const { control, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { loginWithGoogle } = useSession();
  const onLogin = () => {
    console.warn(control._formValues);
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
            rules={{ required: `Email is required` }}
          />

          <AnimatedInputField
            watch={watch}
            control={control}
            name="password"
            type="text"
            label="Password"
            textColor="white"
            rules={{ required: `Password is required` }}
          />
        </Box>
        <Button
          btnVariant={ButtonVariantEnum.PRIMARY}
          title="Login"
          onPress={handleSubmit(onLogin)}
          style={{ margin: 0 }}
        />
        <Typography size="lg" style={{ color: 'white' }}>
          or
        </Typography>
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <TouchableOpacity
            style={styles.providerButton}
            onPress={loginWithGoogle}
          >
            <Icon name="GoogleIcon" height={36} width={36} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.providerButton}>
            <Icon name="MetaIcon" height={36} width={36} />
          </TouchableOpacity>
        </Box>
      </BlurView>
    </Box>
  );
};
