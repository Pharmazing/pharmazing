import { StatusBar } from 'expo-status-bar';
import { Button, Text } from 'react-native';
import { styles } from '../../../utils/appStyles/styles';
import { useGetAllUsersLazyQuery } from '../../../generated/graphql';
import { useSession } from '../../../utils/context';
import { router } from 'expo-router';
import { ScrollBox, Typography } from '../../atoms';

export function HomeMobile() {
  const [getAllUsersTrigger, { loading, error, data }] =
    useGetAllUsersLazyQuery({
      variables: {},
    });

  const { session } = useSession();
  return (
    <ScrollBox style={styles.container}>
      <Typography>Open up Mobile.tsx to start working on your app!</Typography>
      <Text>{process.env.EXPO_PUBLIC_API_URL}</Text>
      <Button
        title="Getallusers"
        disabled={loading}
        onPress={() => getAllUsersTrigger()}
      />
      <Button title="Pharmacy1" onPress={() => router.push('/pharmacy/1')} />
      <Button title="Pharmacy2" onPress={() => router.push('/pharmacy/2')} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      <Text>{JSON.stringify(data)}</Text>
      <StatusBar style="auto" />
    </ScrollBox>
  );
}
