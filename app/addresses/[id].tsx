import { Stack, useLocalSearchParams } from 'expo-router';
import { Box } from '../../src/components/atoms';
import { Addresses } from '../../src/components/organisms';
import { isAndroid, isIOS } from '../../src/utils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Page() {
  const { id } = useLocalSearchParams();
  return (
    (isIOS || isAndroid) && (
      // <SafeAreaProvider>
      <GestureHandlerRootView>
        <Box style={{ flex: 1 }}>
          <Stack.Screen
            options={{
              headerTitle: `addresses for ${id}`,
              headerBackTitle: 'Settings',
            }}
          />
          <Addresses />
        </Box>
      </GestureHandlerRootView>
    )
  );
}
