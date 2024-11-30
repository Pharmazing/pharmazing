import { BlurView } from 'expo-blur';
import { Box, Button, ButtonVariantEnum, Icon, Typography } from '../../atoms';
import { LoginProps } from './Login.types';
import { useStyles } from 'react-native-unistyles';
import { loginStyles } from './Login.styles';
import { AnimatedInputField } from '../../atoms/Input';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { useSession } from '../../../utils/context';
import { router, useSegments } from 'expo-router';
import { emailRegex } from '../../../utils';
import auth from '@react-native-firebase/auth';

export const Login = (props: LoginProps) => {
  const { styles } = useStyles(loginStyles);
  const { control, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { loginWithGoogle, loginAsGuest, setSession, setMethod } = useSession();
  const onLogin = async () => {
    try {
      setMethod('firebase');
      const { email, password } = control._formValues;
      const result = await auth().signInWithEmailAndPassword(email, password);
      const idToken = await result.user.getIdToken();
      // console.warn('result', idToken);
      setSession(JSON.stringify({ idToken }));
    } catch (e: any) {
      console.warn('error', e.message);
    }
    console.warn(control._formValues);
  };

  const segments = useSegments();
  const isSecondarySignin = segments?.[0] === 'signin2';

  const showContinueAsGuest = segments?.[0] === 'signin' || isSecondarySignin;
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
          title="Login"
          onPress={handleSubmit(onLogin)}
          style={{ margin: 0 }}
        />
        <Typography weight="700" size="xl" style={{ color: 'white' }}>
          or
        </Typography>
        <Box
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            gap: 16,
          }}
        >
          {showContinueAsGuest && (
            <Button
              style={{ margin: 0 }}
              btnVariant={ButtonVariantEnum.SECONDARY}
              textStyle={{ color: 'white' }}
              title={'Continue As Guest'}
              onPress={() => {
                loginAsGuest(isSecondarySignin);
                // Sentry.captureMessage("Continue As Guest");
              }}
            />
          )}
          <Button
            style={{ margin: 0 }}
            textStyle={{ color: 'white' }}
            btnVariant={ButtonVariantEnum.SECONDARY}
            title={'Sign Up'}
            onPress={() => router.replace('/signup')}
          />
        </Box>
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
