import React, { useMemo } from 'react';
import { useSession, useUser } from '../../../utils/context';
import {
  Box,
  Button,
  ButtonVariantEnum,
  ScrollBox,
  Toggle,
  Typography,
} from '../../atoms';
import { SettingsBox } from '../../molecules';
import * as Constants from 'expo-constants';
import { useHeaderHeight } from '@react-navigation/elements';
import { isAndroid } from '../../../utils';
import { UnistylesRuntime } from 'react-native-unistyles';

export function SettingsMobile() {
  const { signOut } = useSession();
  const { user } = useUser();
  const userId = useMemo(() => user?.userId || '', [user]);
  const height = useHeaderHeight();
  const [active, setActive] = React.useState(
    UnistylesRuntime.themeName === 'light'
  );
  console.log('theme', UnistylesRuntime.themeName);
  return (
    <ScrollBox
      contentContainerStyle={{
        display: 'flex',
        alignItems: 'center',
        padding: 16,
        flexGrow: 1,
        // borderWidth: 1,
        marginTop: isAndroid ? 0 : height + Constants.default.statusBarHeight,
      }}
    >
      {userId && (
        <SettingsBox
          // title="Profile"
          settingLinks={[
            {
              content: 'Personal Info',
              icon: 'PersonIcon',
              href: `/personalinfo/${userId || '1'}`,
              // disabled: !userId,
            },
            {
              content: 'Addresses',
              icon: 'LocationIcon',
              href: `/addresses/${userId || '1'}`,
              // disabled: !userId,
            },
            {
              content: 'Prescriptions',
              icon: 'PrescriptionIcon',
              href: '/settings/prescriptions',
              // disabled: true,
            },
          ]}
        />
      )}
      <Box
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <Typography weight="500" size="xl">
          Toggle Theme
        </Typography>
        <Toggle
          value={active}
          onValueChange={() => {
            setActive(!active);
            if (UnistylesRuntime.themeName === 'light') {
              UnistylesRuntime.setTheme('dark');
            } else {
              UnistylesRuntime.setTheme('light');
            }
          }}
        />
      </Box>
      <Button
        btnVariant={ButtonVariantEnum.SECONDARY}
        title={'Logout'}
        onPress={signOut}
        activeOpacity={0.6}
      />
    </ScrollBox>
  );
}
