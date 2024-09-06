import { Vendor } from '../../../generated/graphql';

export type VendorType = Omit<Vendor, '__typename'>;

export type VendorListProps = {
  vendors?: VendorType[];
};

export type VendorCardProps = {
  vendor: VendorType;
  onPress: (vendorId: string) => void;
};
