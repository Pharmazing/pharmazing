import { Vendor } from '../../../generated/graphql';

export type VendorType = Omit<Vendor, '__typename'>;

export type VendorListProps = {
  vendors?: VendorType[];
  loading?: boolean;
};

export type VendorCardProps = {
  vendor: VendorType;
  onPress: (vendor: VendorType) => void;
};
