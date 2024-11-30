import React from 'react';
import { router } from 'expo-router';
import { Button, ImageBackground } from 'react-native';
import { EventProvider } from 'react-native-outside-press';
import { useStyles } from 'react-native-unistyles';
import { styles as appStyles } from '../src/utils/appStyles/styles';
import { LoadingIndicator, ScrollBox, SignUp } from '../src/components';
import { isIOS, isAndroid, useToast } from '../src/utils';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function Page() {
  const { showToast } = useToast();
  const { styles } = useStyles(appStyles);
  const [user, setUser] =
    React.useState<FirebaseAuthTypes.UserCredential | null>(null);
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async ({ email, password }: any) => {
    try {
      setLoading(true);
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      // const result2 = await result.user.sendEmailVerification();
      showToast({
        type: 'success',
        text2: 'Check your email for verification',
      });
      setUser(result);
      router.replace('/signin2');
      // console.warn('result', result);
      // console.warn('result2', result2);

      // await triggerSignup({
      //   variables: {user: {userId: result.user.uid, email: result.user.email || 'test', firstName: 'test', lastName: 'test'}},
      // })
    } catch (e: any) {
      showToast({ type: 'error', text1: 'Error', text2: e.message });
      console.warn('error', e.message);
    } finally {
      setLoading(false);
      // console.warn('finally');
    }
  };

  // console.warn('signUpData', signUpData);
  return (
    <EventProvider>
      <ScrollBox
        scrollEnabled={false}
        contentContainerStyle={[styles.container, { padding: 0 }]}
      >
        {/* <Spinner visible={(signInLoading) || (signUpLoading)} textContent={"Loading"} /> */}
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          // defaultSource={{ uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png` }}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_MEDIA_URL}/login.png`,
          }}
        >
          <SignUp onSubmit={onSubmit} userCreated={!!user} />
          <Button
            title="Back to Log in"
            onPress={() =>
              router.replace(isIOS || isAndroid ? '/signin2' : '/signin')
            }
          />
        </ImageBackground>
      </ScrollBox>
      {loading && <LoadingIndicator size="large" loading={loading} />}
    </EventProvider>
  );
}
