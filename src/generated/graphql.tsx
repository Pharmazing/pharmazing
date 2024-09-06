import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Address = {
  __typename?: 'Address';
  addressId?: Maybe<Scalars['ID']['output']>;
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  parish?: Maybe<Scalars['String']['output']>;
  primary?: Maybe<Scalars['Boolean']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type CreateAddressInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  parish: Scalars['String']['input'];
  primary: Scalars['Boolean']['input'];
  zip: Scalars['String']['input'];
};

export type CreateHours = {
  close?: InputMaybe<Scalars['String']['input']>;
  day?: InputMaybe<Scalars['String']['input']>;
  open?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMedia = {
  alt?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  media?: InputMaybe<Array<InputMaybe<CreateMedia>>>;
  prescriptionRequired?: InputMaybe<Scalars['Boolean']['input']>;
  productCategory?: InputMaybe<Scalars['String']['input']>;
  productDescription: Scalars['String']['input'];
  productName: Scalars['String']['input'];
  productPrice: Scalars['Float']['input'];
  vendorId: Scalars['String']['input'];
};

export type CreateUserInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVendorInput = {
  contact: Array<Scalars['String']['input']>;
  hours: Array<InputMaybe<CreateHours>>;
  location: CreateAddressInput;
  media: Array<InputMaybe<CreateMedia>>;
  vendorName: Scalars['String']['input'];
};

export type DeleteAddressResult = {
  __typename?: 'DeleteAddressResult';
  success: Scalars['Boolean']['output'];
};

export type DeleteProductInput = {
  productId: Scalars['String']['input'];
};

export type DeleteProductResult = {
  __typename?: 'DeleteProductResult';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteUserInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type DeleteVendorInput = {
  vendorId?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteVendorResult = {
  __typename?: 'DeleteVendorResult';
  success: Scalars['Boolean']['output'];
};

export type EditAddressInput = {
  addressId?: InputMaybe<Scalars['ID']['input']>;
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  parish?: InputMaybe<Scalars['String']['input']>;
  primary?: InputMaybe<Scalars['Boolean']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type EditProductInput = {
  media?: InputMaybe<Array<InputMaybe<Array<InputMaybe<CreateMedia>>>>>;
  prescriptionRequired?: InputMaybe<Scalars['Boolean']['input']>;
  productCategory?: InputMaybe<Scalars['String']['input']>;
  productDescription?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  productName?: InputMaybe<Scalars['String']['input']>;
  productPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type EditUserInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type EditVendorInput = {
  contact?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hours?: InputMaybe<Array<InputMaybe<CreateHours>>>;
  location?: InputMaybe<EditAddressInput>;
  media?: InputMaybe<Array<InputMaybe<CreateMedia>>>;
  vendorId: Scalars['String']['input'];
  vendorName?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllProductsInput = {
  vendorId?: InputMaybe<Scalars['String']['input']>;
};

export type Hours = {
  __typename?: 'Hours';
  close?: Maybe<Scalars['String']['output']>;
  day?: Maybe<Scalars['String']['output']>;
  open?: Maybe<Scalars['String']['output']>;
};

export type Media = {
  __typename?: 'Media';
  alt?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress?: Maybe<Address>;
  createProduct?: Maybe<Product>;
  createUser?: Maybe<User>;
  createVendor?: Maybe<Vendor>;
  deleteAddress?: Maybe<DeleteAddressResult>;
  deleteProduct?: Maybe<DeleteProductResult>;
  deleteUser?: Maybe<DeleteAddressResult>;
  deleteVendor?: Maybe<DeleteVendorResult>;
  editAddress?: Maybe<Address>;
  editProduct?: Maybe<Product>;
  editUser?: Maybe<User>;
  editVendor?: Maybe<Vendor>;
};

export type MutationCreateAddressArgs = {
  address?: InputMaybe<CreateAddressInput>;
  userId: Scalars['String']['input'];
};

export type MutationCreateProductArgs = {
  product?: InputMaybe<CreateProductInput>;
};

export type MutationCreateUserArgs = {
  user?: InputMaybe<CreateUserInput>;
};

export type MutationCreateVendorArgs = {
  vendor?: InputMaybe<CreateVendorInput>;
};

export type MutationDeleteAddressArgs = {
  addressId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationDeleteProductArgs = {
  product?: InputMaybe<DeleteProductInput>;
};

export type MutationDeleteUserArgs = {
  user?: InputMaybe<DeleteUserInput>;
};

export type MutationDeleteVendorArgs = {
  vendor?: InputMaybe<DeleteVendorInput>;
};

export type MutationEditAddressArgs = {
  address?: InputMaybe<EditAddressInput>;
  userId: Scalars['String']['input'];
};

export type MutationEditProductArgs = {
  product?: InputMaybe<EditProductInput>;
};

export type MutationEditUserArgs = {
  user?: InputMaybe<EditUserInput>;
};

export type MutationEditVendorArgs = {
  vendor?: InputMaybe<EditVendorInput>;
};

export type Product = {
  __typename?: 'Product';
  media?: Maybe<Array<Maybe<Media>>>;
  prescriptionRequired?: Maybe<Scalars['Boolean']['output']>;
  productCategory?: Maybe<Scalars['String']['output']>;
  productDescription?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  productPrice?: Maybe<Scalars['Float']['output']>;
  vendorId?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllProducts?: Maybe<Array<Maybe<Product>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getAllVendors?: Maybe<Array<Maybe<Vendor>>>;
  getUserAddress?: Maybe<Array<Address>>;
  signIn?: Maybe<User>;
};

export type QueryGetAllProductsArgs = {
  vendor?: InputMaybe<GetAllProductsInput>;
};

export type QueryGetUserAddressArgs = {
  userId: Scalars['String']['input'];
};

export type QuerySignInArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Array<Address>>;
  age?: Maybe<Scalars['Int']['output']>;
  cartId?: Maybe<Scalars['String']['output']>;
  contactNumber?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type Vendor = {
  __typename?: 'Vendor';
  contact?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  hours?: Maybe<Array<Maybe<Hours>>>;
  location?: Maybe<Address>;
  media?: Maybe<Array<Maybe<Media>>>;
  vendorId?: Maybe<Scalars['String']['output']>;
  vendorName?: Maybe<Scalars['String']['output']>;
};

export type CreateUserMutationVariables = Exact<{
  user?: InputMaybe<CreateUserInput>;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser?: {
    __typename?: 'User';
    age?: number | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    token?: string | null;
    userId?: string | null;
    address?: Array<{
      __typename?: 'Address';
      addressId?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      city?: string | null;
      country?: string | null;
      parish?: string | null;
      primary?: boolean | null;
      userId?: string | null;
      zip?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    }> | null;
  } | null;
};

export type EditUserMutationVariables = Exact<{
  user?: InputMaybe<EditUserInput>;
}>;

export type EditUserMutation = {
  __typename?: 'Mutation';
  editUser?: {
    __typename?: 'User';
    userId?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    age?: number | null;
    email?: string | null;
  } | null;
};

export type DeleteUserMutationVariables = Exact<{
  user?: InputMaybe<DeleteUserInput>;
}>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  deleteUser?: { __typename?: 'DeleteAddressResult'; success: boolean } | null;
};

export type CreateAddressMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  address?: InputMaybe<CreateAddressInput>;
}>;

export type CreateAddressMutation = {
  __typename?: 'Mutation';
  createAddress?: {
    __typename?: 'Address';
    addressId?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    parish?: string | null;
    country?: string | null;
    zip?: string | null;
    primary?: boolean | null;
    longitude?: number | null;
    latitude?: number | null;
  } | null;
};

export type EditAddressMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  address?: InputMaybe<EditAddressInput>;
}>;

export type EditAddressMutation = {
  __typename?: 'Mutation';
  editAddress?: {
    __typename?: 'Address';
    addressId?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    parish?: string | null;
    country?: string | null;
    zip?: string | null;
    primary?: boolean | null;
    longitude?: number | null;
    latitude?: number | null;
  } | null;
};

export type DeleteAddressMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  addressId: Scalars['String']['input'];
}>;

export type DeleteAddressMutation = {
  __typename?: 'Mutation';
  deleteAddress?: {
    __typename?: 'DeleteAddressResult';
    success: boolean;
  } | null;
};

export type SignInQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;

export type SignInQuery = {
  __typename?: 'Query';
  signIn?: {
    __typename?: 'User';
    userId?: string | null;
    token?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    age?: number | null;
    address?: Array<{
      __typename?: 'Address';
      addressId?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      city?: string | null;
      parish?: string | null;
      country?: string | null;
      zip?: string | null;
      primary?: boolean | null;
      longitude?: number | null;
      latitude?: number | null;
    }> | null;
  } | null;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
  __typename?: 'Query';
  getAllUsers?: Array<{
    __typename?: 'User';
    age?: number | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    token?: string | null;
    userId?: string | null;
    address?: Array<{
      __typename?: 'Address';
      addressId?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      city?: string | null;
      country?: string | null;
      parish?: string | null;
      primary?: boolean | null;
      userId?: string | null;
      zip?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    }> | null;
  } | null> | null;
};

export type GetAddressQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetAddressQuery = {
  __typename?: 'Query';
  getUserAddress?: Array<{
    __typename?: 'Address';
    addressId?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    parish?: string | null;
    country?: string | null;
    zip?: string | null;
    primary?: boolean | null;
    longitude?: number | null;
    latitude?: number | null;
  }> | null;
};

export type GetAllVendorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllVendorsQuery = {
  __typename?: 'Query';
  getAllVendors?: Array<{
    __typename?: 'Vendor';
    vendorId?: string | null;
    vendorName?: string | null;
    contact?: Array<string | null> | null;
    media?: Array<{
      __typename?: 'Media';
      alt?: string | null;
      type?: string | null;
      url?: string | null;
    } | null> | null;
    hours?: Array<{
      __typename?: 'Hours';
      day?: string | null;
      open?: string | null;
      close?: string | null;
    } | null> | null;
    location?: {
      __typename?: 'Address';
      addressId?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      city?: string | null;
      parish?: string | null;
      country?: string | null;
      zip?: string | null;
      primary?: boolean | null;
      longitude?: number | null;
      latitude?: number | null;
    } | null;
  } | null> | null;
};

export type GetProductsQueryVariables = Exact<{
  vendor?: InputMaybe<GetAllProductsInput>;
}>;

export type GetProductsQuery = {
  __typename?: 'Query';
  getAllProducts?: Array<{
    __typename?: 'Product';
    productId?: string | null;
    productName?: string | null;
    productDescription?: string | null;
    productPrice?: number | null;
    vendorId?: string | null;
    prescriptionRequired?: boolean | null;
    productCategory?: string | null;
    media?: Array<{
      __typename?: 'Media';
      alt?: string | null;
      type?: string | null;
      url?: string | null;
    } | null> | null;
  } | null> | null;
};

export const CreateUserDocument = gql`
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
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const EditUserDocument = gql`
  mutation EditUser($user: EditUserInput) {
    editUser(user: $user) {
      userId
      firstName
      lastName
      age
      email
    }
  }
`;
export type EditUserMutationFn = Apollo.MutationFunction<
  EditUserMutation,
  EditUserMutationVariables
>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useEditUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditUserMutation,
    EditUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(
    EditUserDocument,
    options
  );
}
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<
  EditUserMutation,
  EditUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($user: DeleteUserInput) {
    deleteUser(user: $user) {
      success
    }
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const CreateAddressDocument = gql`
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
export type CreateAddressMutationFn = Apollo.MutationFunction<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useCreateAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >(CreateAddressDocument, options);
}
export type CreateAddressMutationHookResult = ReturnType<
  typeof useCreateAddressMutation
>;
export type CreateAddressMutationResult =
  Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<
  CreateAddressMutation,
  CreateAddressMutationVariables
>;
export const EditAddressDocument = gql`
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
export type EditAddressMutationFn = Apollo.MutationFunction<
  EditAddressMutation,
  EditAddressMutationVariables
>;

/**
 * __useEditAddressMutation__
 *
 * To run a mutation, you first call `useEditAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAddressMutation, { data, loading, error }] = useEditAddressMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useEditAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditAddressMutation,
    EditAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditAddressMutation, EditAddressMutationVariables>(
    EditAddressDocument,
    options
  );
}
export type EditAddressMutationHookResult = ReturnType<
  typeof useEditAddressMutation
>;
export type EditAddressMutationResult =
  Apollo.MutationResult<EditAddressMutation>;
export type EditAddressMutationOptions = Apollo.BaseMutationOptions<
  EditAddressMutation,
  EditAddressMutationVariables
>;
export const DeleteAddressDocument = gql`
  mutation DeleteAddress($userId: String!, $addressId: String!) {
    deleteAddress(userId: $userId, addressId: $addressId) {
      success
    }
  }
`;
export type DeleteAddressMutationFn = Apollo.MutationFunction<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useDeleteAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAddressMutation,
    DeleteAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAddressMutation,
    DeleteAddressMutationVariables
  >(DeleteAddressDocument, options);
}
export type DeleteAddressMutationHookResult = ReturnType<
  typeof useDeleteAddressMutation
>;
export type DeleteAddressMutationResult =
  Apollo.MutationResult<DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<
  DeleteAddressMutation,
  DeleteAddressMutationVariables
>;
export const SignInDocument = gql`
  query SignIn($email: String, $password: String) {
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

/**
 * __useSignInQuery__
 *
 * To run a query within a React component, call `useSignInQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignInQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInQuery(
  baseOptions?: Apollo.QueryHookOptions<SignInQuery, SignInQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SignInQuery, SignInQueryVariables>(
    SignInDocument,
    options
  );
}
export function useSignInLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SignInQuery, SignInQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SignInQuery, SignInQueryVariables>(
    SignInDocument,
    options
  );
}
export function useSignInSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SignInQuery,
    SignInQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SignInQuery, SignInQueryVariables>(
    SignInDocument,
    options
  );
}
export type SignInQueryHookResult = ReturnType<typeof useSignInQuery>;
export type SignInLazyQueryHookResult = ReturnType<typeof useSignInLazyQuery>;
export type SignInSuspenseQueryHookResult = ReturnType<
  typeof useSignInSuspenseQuery
>;
export type SignInQueryResult = Apollo.QueryResult<
  SignInQuery,
  SignInQueryVariables
>;
export const GetAllUsersDocument = gql`
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

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetAllUsersSuspenseQuery
>;
export type GetAllUsersQueryResult = Apollo.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>;
export const GetAddressDocument = gql`
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

/**
 * __useGetAddressQuery__
 *
 * To run a query within a React component, call `useGetAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAddressQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAddressQuery,
    GetAddressQueryVariables
  > &
    (
      | { variables: GetAddressQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAddressQuery, GetAddressQueryVariables>(
    GetAddressDocument,
    options
  );
}
export function useGetAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAddressQuery,
    GetAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAddressQuery, GetAddressQueryVariables>(
    GetAddressDocument,
    options
  );
}
export function useGetAddressSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAddressQuery,
    GetAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAddressQuery, GetAddressQueryVariables>(
    GetAddressDocument,
    options
  );
}
export type GetAddressQueryHookResult = ReturnType<typeof useGetAddressQuery>;
export type GetAddressLazyQueryHookResult = ReturnType<
  typeof useGetAddressLazyQuery
>;
export type GetAddressSuspenseQueryHookResult = ReturnType<
  typeof useGetAddressSuspenseQuery
>;
export type GetAddressQueryResult = Apollo.QueryResult<
  GetAddressQuery,
  GetAddressQueryVariables
>;
export const GetAllVendorsDocument = gql`
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

/**
 * __useGetAllVendorsQuery__
 *
 * To run a query within a React component, call `useGetAllVendorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllVendorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllVendorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllVendorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllVendorsQuery,
    GetAllVendorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllVendorsQuery, GetAllVendorsQueryVariables>(
    GetAllVendorsDocument,
    options
  );
}
export function useGetAllVendorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllVendorsQuery,
    GetAllVendorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllVendorsQuery, GetAllVendorsQueryVariables>(
    GetAllVendorsDocument,
    options
  );
}
export function useGetAllVendorsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAllVendorsQuery,
    GetAllVendorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllVendorsQuery,
    GetAllVendorsQueryVariables
  >(GetAllVendorsDocument, options);
}
export type GetAllVendorsQueryHookResult = ReturnType<
  typeof useGetAllVendorsQuery
>;
export type GetAllVendorsLazyQueryHookResult = ReturnType<
  typeof useGetAllVendorsLazyQuery
>;
export type GetAllVendorsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllVendorsSuspenseQuery
>;
export type GetAllVendorsQueryResult = Apollo.QueryResult<
  GetAllVendorsQuery,
  GetAllVendorsQueryVariables
>;
export const GetProductsDocument = gql`
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

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      vendor: // value for 'vendor'
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    options
  );
}
export function useGetProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    options
  );
}
export function useGetProductsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    options
  );
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<
  typeof useGetProductsLazyQuery
>;
export type GetProductsSuspenseQueryHookResult = ReturnType<
  typeof useGetProductsSuspenseQuery
>;
export type GetProductsQueryResult = Apollo.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
