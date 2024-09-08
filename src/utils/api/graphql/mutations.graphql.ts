import { gql } from '@apollo/client';

export const createUserMutation = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      age
      email
      firstName
      lastName
      password
      token
      userId
      address {
        addressId
        addressLine1
        addressLine2
        city
        country
        parish
        primary
        userId
        zip
        latitude
        longitude
      }
    }
  }
`;

export const editUserMutation = gql`
  mutation EditUser($user: EditUserInput) {
    editUser(user: $user) {
      userId
      firstName
      lastName
      age
      email
      cartId
    }
  }
`;

export const deleteUserMutation = gql`
  mutation DeleteUser($user: DeleteUserInput) {
    deleteUser(user: $user) {
      success
    }
  }
`;

export const createAddressMutation = gql`
  mutation CreateAddress($userId: String!, $address: CreateAddressInput) {
    createAddress(userId: $userId, address: $address) {
      addressId
      addressLine1
      addressLine2
      city
      parish
      country
      zip
      primary
      longitude
      latitude
    }
  }
`;

export const editAddressMutation = gql`
  mutation EditAddress($userId: String!, $address: EditAddressInput) {
    editAddress(userId: $userId, address: $address) {
      addressId
      addressLine1
      addressLine2
      city
      parish
      country
      zip
      primary
      longitude
      latitude
    }
  }
`;

export const deleteAddressMutation = gql`
  mutation DeleteAddress($userId: String!, $addressId: String!) {
    deleteAddress(userId: $userId, addressId: $addressId) {
      success
    }
  }
`;
