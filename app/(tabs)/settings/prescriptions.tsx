import { isAndroid, isIOS } from '../../../src/utils';
import PrescriptionsLayout from '../../../src/pages/Prescriptions';

export default function Page() {
  return (isIOS || isAndroid) && <PrescriptionsLayout />;
}
