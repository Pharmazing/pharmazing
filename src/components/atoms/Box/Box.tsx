import React, { forwardRef } from 'react';
import { BoxProps } from './Box.types';
import { View } from 'react-native';

// export const Box = forwardRef((props, ref) => {return null});

export const Box = forwardRef<any, BoxProps>(({ children, ...rest }, ref) => {
  return <View {...rest}>{children}</View>;
});

Box.displayName = 'Box';
