import React, { useMemo } from 'react';
import { useSession, useUser } from '../../../utils/context';
import { Button, ButtonVariantEnum, ScrollBox } from '../../atoms';
import { SettingsBox } from '../../molecules';
import * as Constants from 'expo-constants';
import { useHeaderHeight } from '@react-navigation/elements';
import { isAndroid } from '../../../utils';

export function SettingsMobile() {
  const { signOut } = useSession();
  const { user } = useUser();
  const userId = useMemo(() => user?.userId || '', [user]);
  const height = useHeaderHeight();
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
      <Button
        btnVariant={ButtonVariantEnum.SECONDARY}
        title={'Logout'}
        onPress={signOut}
        activeOpacity={0.6}
      />
    </ScrollBox>
  );
}
