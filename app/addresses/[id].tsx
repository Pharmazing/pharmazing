import { Addresses } from '../../src/components/organisms';
import { isAndroid, isIOS } from '../../src/utils';

export default function Page() {
  return (isIOS || isAndroid) && <Addresses />;
}
