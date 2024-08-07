import { EditAddressLayout } from '../../src/pages/EditAddress';
import { isAndroid, isIOS } from '../../src/utils';

export default function Page() {
  return (isIOS || isAndroid) && <EditAddressLayout />;
}
