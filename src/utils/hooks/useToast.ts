import Toast, { ToastShowParams } from 'react-native-toast-message';
import * as Constants from 'expo-constants';

export interface useToastProps extends ToastShowParams {}

export const useToast = () => {
  const showToast = (params: ToastShowParams) => {
    Toast.show({ ...params, topOffset: Constants.default.statusBarHeight + 8 });
  };
  return { showToast };
};
