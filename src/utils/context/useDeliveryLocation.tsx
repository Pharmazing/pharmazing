import { createContext, useContext, useState } from 'react';
import { AddressType } from './useUser';

type IDeliveryLocationContext = {
  shippingAddress: AddressType;
  billingAddress: AddressType;
  updateShippingAddress: (address: AddressType) => void;
  updateBillingAddress: (address: AddressType) => void;
  clearDeliveryLocation: () => void;
};

const DeliveryLocationContext = createContext<IDeliveryLocationContext>({
  shippingAddress: {
    addressId: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    country: null,
    parish: null,
    zip: null,
  },
  billingAddress: {
    addressId: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    country: null,
    parish: null,
    zip: null,
  },
  updateShippingAddress: () => null,
  updateBillingAddress: () => null,
  clearDeliveryLocation: () => null,
});

export function useDeliveryLocation() {
  const value = useContext(DeliveryLocationContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error(
        'useDeliveryLocation must be wrapped in a <DeliveryLocationProvider />'
      );
    }
  }

  return value;
}

export function DeliveryLocationProvider({
  children,
}: React.PropsWithChildren) {
  const [shippingAddress, updateShippingAddress] = useState<AddressType>({
    addressId: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    country: null,
    parish: null,
    zip: null,
  });
  const [billingAddress, updateBillingAddress] = useState<AddressType>({
    addressId: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    country: null,
    parish: null,
    zip: null,
  });

  const clearDeliveryLocation = () => {
    updateShippingAddress({
      addressId: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      country: null,
      parish: null,
      zip: null,
    });
    updateBillingAddress({
      addressId: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      country: null,
      parish: null,
      zip: null,
    });
  };

  return (
    <DeliveryLocationContext.Provider
      value={{
        shippingAddress,
        billingAddress,
        updateShippingAddress,
        updateBillingAddress,
        clearDeliveryLocation,
      }}
    >
      {children}
    </DeliveryLocationContext.Provider>
  );
}
