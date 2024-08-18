import { createContext, useContext, useState } from 'react';
import { Address, User } from '../../generated/graphql';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type AddressType = Omit<Address, '__typename'>;

export type UserType = Omit<User, '__typename' | 'address'> & {
  address: Array<AddressType>;
};

type IUserContext = {
  user: UserType;
  address: Array<AddressType>;
  setUser: (user: UserType) => void;
  getUser: (id: string) => UserType | null | undefined;
  deleteUser: () => void;
  updateUser: (user: PartialBy<UserType, 'address'>) => void;
  clearUser: () => void;
  addAddress: (address: AddressType) => void;
  updateAddress: (address: AddressType) => void;
  deleteAddress: (addressId: string) => void;
};

const UserContext = createContext<IUserContext>({
  user: {
    userId: null,
    email: null,
    password: null,
    age: null,
    firstName: null,
    lastName: null,
    address: [],
  },
  setUser: () => null,
  getUser: () => null,
  deleteUser: () => null,
  updateUser: () => null,
  address: [],
  clearUser: () => null,
  addAddress: () => null,
  updateAddress: () => null,
  deleteAddress: () => null,
});

export function useUser() {
  const value = useContext(UserContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useUser must be wrapped in a <UserProvider />');
    }
  }

  return value;
}

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<UserType>({
    userId: null,
    email: null,
    password: null,
    age: null,
    firstName: null,
    lastName: null,
    address: [],
  });

  const updateUser = (user: PartialBy<UserType, 'address'>) => {
    setUser((prevUser) => {
      return { ...prevUser, ...user };
    });
  };

  const getUser = (id: string) => {
    return user;
  };

  const clearUser = () => {
    setUser({
      userId: null,
      email: null,
      password: null,
      age: null,
      firstName: null,
      lastName: null,
      address: [],
    });
  };

  const deleteUser = () => {
    clearUser();
  };

  const addAddress = (address: AddressType) => {
    setUser((prevUser) => ({
      ...prevUser,
      address: [...prevUser.address, address],
    }));
  };

  const updateAddress = (address: AddressType) => {
    setUser((prevUser) => {
      const newAddress = prevUser.address.map((a) => {
        if (a.addressId === address.addressId) {
          return { ...a, ...address };
        }
        return a;
      });
      return { ...prevUser, address: newAddress };
    });
  };

  const deleteAddress = (addressId: string) => {
    setUser((prevUser) => {
      const newAddress = prevUser.address.filter(
        (a) => a.addressId !== addressId
      );
      return { ...prevUser, address: newAddress };
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        deleteUser,
        updateUser,
        clearUser,
        setUser,
        addAddress,
        updateAddress,
        deleteAddress,
        address: user.address,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
