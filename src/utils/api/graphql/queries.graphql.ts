import { gql } from '@apollo/client';

export const getUserQuery = gql`
  query SignIn($method: String) {
    signIn(method: $method) {
      userId
      token
      firstName
      lastName
      email
      password
      age
      address {
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
        latitude
        longitude
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

export const getAllVendorsQuery = gql`
  query GetAllVendors {
    getAllVendors {
      vendorId
      vendorName
      contact
      media {
        alt
        type
        url
      }
      hours {
        day
        open
        close
      }
      location {
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
  }
`;

export const getProduct = gql`
  query GetProduct($product: GetProductInput) {
    getProduct(product: $product) {
      productId
      productName
      vendorId
      productPrice
      productDescription
      productCategory
      prescriptionRequired
    }
  }
`;

export const getProductsQuery = gql`
  query GetProducts($vendor: GetAllProductsInput) {
    getAllProducts(vendor: $vendor) {
      productId
      productName
      productDescription
      productPrice
      media {
        alt
        type
        url
      }
      vendorId
      prescriptionRequired
      productCategory
    }
  }
`;

export const getCartQuery = gql`
  query GetCart($userId: String!) {
    getCart(userId: $userId) {
      cartId
      items {
        productId
        quantity
      }
      subtotal
      tax
      total
      shippingAddress {
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
      billingAddress {
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
  }
`;
