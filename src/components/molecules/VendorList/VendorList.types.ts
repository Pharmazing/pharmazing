import { Vendor } from '../../../generated/graphql';

export type VendorType = Vendor;

export type VendorListProps = {
  vendors?: VendorType[];
  loading?: boolean;
};

export type VendorCardProps = {
  vendor: VendorType;
  onPress: (vendor: VendorType) => void;
};
