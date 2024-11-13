import { Link, router, Stack, useNavigationContainerRef } from 'expo-router';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { isAndroid, isIOS, isWeb, toastConfig } from '../src/utils';
import {
  DeliveryLocationProvider,
  SessionProvider,
  UserProvider,
  CartProvider,
} from '../src/utils/context';
import { ApolloProvider } from '@apollo/client';
import { client } from '../src/utils/api/apollo/apolloClient';
import Toast from 'react-native-toast-message';
import 'expo-dev-client';
import '../src/utils/unistyles/unistyles';
import { isRunningInExpoGo } from 'expo';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { core } from '../src/utils/unistyles/core';
import { Icon } from '../src/components/atoms';
// import { CartProvider } from '../src/utils/context/useCart';

import { useStyles } from 'react-native-unistyles';
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: 'https://3555aa46162c3f2476b5db54c5fdce83@o4507655177895936.ingest.us.sentry.io/4507655191724032',
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),

      // ...
    }),
  ],
});

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [loaded, fontsErr] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  const { theme } = useStyles();

  useEffect(() => {
    if (loaded || fontsErr) {
      SplashScreen.hideAsync();
    }
  }, [loaded, fontsErr]);

  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  if (!loaded && !fontsErr) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <UserProvider>
          <CartProvider>
            <DeliveryLocationProvider>
              <SessionProvider>
                {(isIOS || isAndroid) && (
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="signup" />
                    <Stack.Screen
                      name="signin2"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="addresses"
                      options={{
                        headerTitleStyle: {
                          fontSize: 24,
                          color: theme.colors.white,
                        },
                        // headerLargeTitle: true,
                        headerLeft: () => (
                          <Icon
                            name="ChevronRightIcon"
                            color={theme.colors.white}
                            height={36}
                            width={36}
                            transform={'rotate(180 12 12)'}
                            onPress={() => router.back()}
                          />
                        ),
                        headerBackTitle: 'Settings',
                        headerTitle: 'Delivery Addresses',
                        headerStyle: { backgroundColor: core.colors.Green500 },
                        // headerBackTitleStyle: {color: core.colors.White},
                      }}
                    />
                  </Stack>
                )}
                {isWeb && (
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="signup"
                      options={{
                        headerLeft: () => (
                          <Link href="/signin">
                            <Text
                              style={{
                                fontFamily: 'RobotoRegular',
                              }}
                            >
                              Back to login
                            </Text>
                          </Link>
                        ),
                      }}
                    />
                    <Stack.Screen
                      name="signin"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                )}
              </SessionProvider>
              <Toast config={toastConfig} />
            </DeliveryLocationProvider>
          </CartProvider>
        </UserProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(RootLayout);
