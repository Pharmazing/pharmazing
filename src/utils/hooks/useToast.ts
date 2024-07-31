import Toast, { ToastShowParams } from 'react-native-toast-message';

export interface useToastProps extends ToastShowParams {}

export const useToast = (props: useToastProps) => {
  const showToast = () => {
    Toast.show(props);
  };
  return { showToast };
};
