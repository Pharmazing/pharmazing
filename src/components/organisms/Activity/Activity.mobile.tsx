import React from 'react';

import { ScrollBox, Typography } from '../../atoms';
export function ActivityMobile() {
  return (
    <ScrollBox
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography size="lg" weight="500" style={{ opacity: 0.7 }}>
        No activity yet
      </Typography>
    </ScrollBox>
  );
}
