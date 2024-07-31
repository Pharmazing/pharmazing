import React from 'react';
import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { isAndroid, isIOS } from '../src/utils';

export default function Page() {
  return (
    <View>
      <Text>Sign UP Page</Text>
      <Button
        title="Log in instead"
        onPress={() =>
          router.replace(isIOS || isAndroid ? '/signin2' : '/signin')
        }
      />
    </View>
  );
}
