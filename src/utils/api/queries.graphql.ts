import { gql } from "@apollo/client";

export const getUserQuery = gql`
  query SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      userId
      token
      firstName
      lastName
      email
      password
      age
      address {
        addressId
      }
    }
  }
`;

export const getAllUsersQuery = gql`
  query GetAllUsers {
    getAllUsers {
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
      }
      age
      email
      firstName
      lastName
      password
      token
      userId
    }
  }
`;

export const getAddressesQuery = gql`
  query GetAddress($userId: String!) {
    getUserAddress(userId: $userId) {
      addressId
    }
  }
`;
