export type ListDataType = {
  addressId: string;
  addressLine1: string;
  addressLine2?: string;
  parish: string;
  key: string;
  //   initialLeftActionState: boolean;
}[];

export type AddressListProps = {
  openEditModal: (data?: any) => void;
  editModalOpen?: boolean;
};
