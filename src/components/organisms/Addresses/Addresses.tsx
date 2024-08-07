import { router } from 'expo-router';
import { useSession } from '../../../utils/context';
import { Box } from '../../atoms';
import { AddressList, PlacesAutocomplete } from '../../molecules';

import { useState } from 'react';
import { EventProvider } from 'react-native-outside-press';

export function Addresses() {
  const { session } = useSession();
  // const { id: userId } = useLocalSearchParams();
  // this can be moved to the openEditModal function
  const [defaultData, setDefaultData] = useState({});

  const parsedSession = JSON.parse(session || '{}');
  parsedSession?.user?.address?.forEach((addy: any) => console.log(addy));

  const openEditModal = (data: any) => {
    setDefaultData(data);
    router.push({
      pathname: 'addresses/editAddress',
      params: { defaultData: JSON.stringify(defaultData) },
    });
  };

  return (
    <EventProvider>
      <Box style={{ flex: 1, backgroundColor: 'white' }}>
        <Box
          style={{
            width: '100%',
            zIndex: 1,
            padding: 8,
            position: 'absolute',
          }}
        >
          <PlacesAutocomplete onSelect={(data) => console.log(data)} />
        </Box>
        <Box style={{ marginTop: 60, flex: 1 }}>
          <AddressList openEditModal={openEditModal} />
        </Box>
      </Box>
    </EventProvider>
  );
}
