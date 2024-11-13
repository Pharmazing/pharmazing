import Toast, { ToastShowParams } from 'react-native-toast-message';
import * as Constants from 'expo-constants';
import { Box, Typography } from '../../components';
import { BlurView } from 'expo-blur';
import { core } from '../unistyles/core';

export interface useToastProps extends ToastShowParams {}

export const toastConfig = {
  success: ({ text1, text2, ...rest }: useToastProps) => {
    return (
      <BlurView
        intensity={90}
        tint="dark"
        style={{
          width: '80%',
          height: 50,
          borderRadius: 24,
          overflow: 'hidden',
          padding: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography weight="700" style={{ color: 'white' }}>
          {text2}
        </Typography>
      </BlurView>
    );
  },
};

export const useToast = () => {
  const showToast = (params: ToastShowParams) => {
    Toast.show({ ...params, topOffset: Constants.default.statusBarHeight + 8 });
  };
  return { showToast };
};
