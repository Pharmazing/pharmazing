import React from 'react';
import { ScrollBox, Typography } from '../../atoms';

export function CartMobile() {
  return (
    <ScrollBox
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography size="lg" weight="500" style={{ opacity: 0.7 }}>
        No cart yet
      </Typography>
    </ScrollBox>
  );
}
