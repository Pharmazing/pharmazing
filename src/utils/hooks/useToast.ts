import Toast, { ToastShowParams } from 'react-native-toast-message';

export interface useToastProps extends ToastShowParams {}

export const useToast = () => {
  const showToast = (params: ToastShowParams) => {
    Toast.show(params);
  };
  return { showToast };
};
