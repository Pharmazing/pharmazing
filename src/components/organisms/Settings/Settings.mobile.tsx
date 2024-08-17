import React, { useMemo } from 'react';
import { useSession, useUser } from '../../../utils/context';
import { Button, ButtonVariantEnum, ScrollBox } from '../../atoms';
import { SettingsBox } from '../../molecules';

export function SettingsMobile() {
  const { signOut } = useSession();
  const { user } = useUser();
  const userId = useMemo(() => user?.userId || '', [user]);
  return (
    <ScrollBox
      contentContainerStyle={{
        display: 'flex',
        alignItems: 'center',
        padding: 16,
        flexGrow: 1,
      }}
    >
      {
        <SettingsBox
          title="Profile"
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
      }
      <Button
        btnVariant={ButtonVariantEnum.DANGER}
        title={'Logout'}
        onPress={signOut}
      />
    </ScrollBox>
  );
}
