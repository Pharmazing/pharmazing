import { useDisclose } from 'native-base';

export const useActionSheet = () => {
  const { isOpen, onOpen, onClose } = useDisclose(false);
  return { isOpen, onOpen, onClose };
};
