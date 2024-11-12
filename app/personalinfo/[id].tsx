import React from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Box, Icon } from '../../src/components/atoms';
import { PersonalInfo } from '../../src/components/organisms';
import { isAndroid, isIOS } from '../../src/utils';
import { EventProvider } from 'react-native-outside-press';
import { useStyles } from 'react-native-unistyles';
export default function Page() {
  const { id } = useLocalSearchParams();
  const { theme } = useStyles();

  return (
    (isIOS || isAndroid) && (
      <EventProvider>
        <Box style={{ flex: 1 }}>
          <Stack.Screen
            options={{
              headerTitle: 'Personal Info',
              headerTitleStyle: {
                fontSize: 24,
                color: theme.colors.white,
              },
              // headerBackTitle: 'Settings',
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
              headerStyle: {
                backgroundColor: theme.colors.Green500,
              },
            }}
          />
          <PersonalInfo />
        </Box>
      </EventProvider>
    )
  );
}
