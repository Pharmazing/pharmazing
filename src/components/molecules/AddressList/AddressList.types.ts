import { FetchResult } from '@apollo/client';
import { DeleteAddressMutation } from '../../../generated/graphql';

export type ListDataType = {
  addressId: string;
  addressLine1: string;
  addressLine2?: string;
  parish: string;
  key: string;
  primary: boolean;
};

export type AddressListProps = {
  openEditModal: (data?: any) => void;
  editModalOpen?: boolean;
  onDeleteAddress: (
    addressId: string
  ) => Promise<FetchResult<DeleteAddressMutation>>;
};
