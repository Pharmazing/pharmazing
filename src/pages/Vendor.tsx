import { VendorPage } from '../components/organisms/Vendor/VendorPage';
import { isAndroid, isIOS } from '../utils';

type VendorLayoutProps = {
  vendorId: string;
};

export const VendorLayout = ({ vendorId }: VendorLayoutProps) => {
  return (isIOS || isAndroid) && <VendorPage vendorId={vendorId} />;
};
