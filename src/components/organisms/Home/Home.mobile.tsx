import { StatusBar } from 'expo-status-bar';
import { Button, Text } from 'react-native';
import { styles } from '../../../utils/appStyles/styles';
import { useGetAllVendorsLazyQuery } from '../../../generated/graphql';
import { router } from 'expo-router';
import { ScrollBox, Typography } from '../../atoms';
import { useUser } from '../../../utils/context';
export function HomeMobile() {
  const [getAllVendorsTrigger, { loading, error, data }] =
    useGetAllVendorsLazyQuery({
      variables: {},
    });

  const { user } = useUser();
  return (
    <ScrollBox style={styles.container}>
      <Typography>Open up Mobile.tsx to start working on your app!</Typography>
      {/* <Text>{process.env.EXPO_PUBLIC_API_URL}</Text> */}
      <Button
        title="get all vendors"
        disabled={loading}
        onPress={() => getAllVendorsTrigger()}
      />
      <Button title="Pharmacy1" onPress={() => router.push('/pharmacy/1')} />
      <Button title="Pharmacy2" onPress={() => router.push('/pharmacy/2')} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {JSON.stringify(error)}</Text>}
      <Text style={{ color: 'red' }}>{JSON.stringify(data)}</Text>
      <Text>{JSON.stringify(user)}</Text>
      <StatusBar style="auto" />
    </ScrollBox>
  );
}
