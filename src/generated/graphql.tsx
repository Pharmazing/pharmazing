import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
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
  __typename?: "Address";
  addressId?: Maybe<Scalars["ID"]["output"]>;
  addressLine1?: Maybe<Scalars["String"]["output"]>;
  addressLine2?: Maybe<Scalars["String"]["output"]>;
  city?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  parish?: Maybe<Scalars["String"]["output"]>;
  primary?: Maybe<Scalars["Boolean"]["output"]>;
  userId?: Maybe<Scalars["ID"]["output"]>;
  zip?: Maybe<Scalars["String"]["output"]>;
};

export type CreateAddressInput = {
  addressLine1: Scalars["String"]["input"];
  addressLine2?: InputMaybe<Scalars["String"]["input"]>;
  city: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  parish: Scalars["String"]["input"];
  primary: Scalars["Boolean"]["input"];
  zip: Scalars["String"]["input"];
};

export type CreateUserInput = {
  age?: InputMaybe<Scalars["Int"]["input"]>;
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeleteAddressResult = {
  __typename?: "DeleteAddressResult";
  success: Scalars["Boolean"]["output"];
};

export type DeleteUserInput = {
  password?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type EditAddressInput = {
  addressId: Scalars["ID"]["input"];
  addressLine1?: InputMaybe<Scalars["String"]["input"]>;
  addressLine2?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  parish?: InputMaybe<Scalars["String"]["input"]>;
  primary?: InputMaybe<Scalars["Boolean"]["input"]>;
  zip?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditUserInput = {
  age?: InputMaybe<Scalars["Int"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAddress?: Maybe<Address>;
  createUser?: Maybe<User>;
  deleteAddress?: Maybe<DeleteAddressResult>;
  deleteUser?: Maybe<DeleteAddressResult>;
  editAddress?: Maybe<Address>;
  editUser?: Maybe<User>;
};

export type MutationCreateAddressArgs = {
  address?: InputMaybe<CreateAddressInput>;
  userId: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
  user?: InputMaybe<CreateUserInput>;
};

export type MutationDeleteAddressArgs = {
  addressId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationDeleteUserArgs = {
  user?: InputMaybe<DeleteUserInput>;
};

export type MutationEditAddressArgs = {
  address?: InputMaybe<EditAddressInput>;
  userId: Scalars["String"]["input"];
};

export type MutationEditUserArgs = {
  user?: InputMaybe<EditUserInput>;
};

export type Query = {
  __typename?: "Query";
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getUserAddress?: Maybe<Array<Address>>;
  signIn?: Maybe<User>;
};

export type QueryGetUserAddressArgs = {
  userId: Scalars["String"]["input"];
};

export type QuerySignInArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  address?: Maybe<Array<Address>>;
  age?: Maybe<Scalars["Int"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  firstName?: Maybe<Scalars["String"]["output"]>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  password?: Maybe<Scalars["String"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
  userId?: Maybe<Scalars["ID"]["output"]>;
};

export type CreateUserMutationVariables = Exact<{
  user?: InputMaybe<CreateUserInput>;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser?: {
    __typename?: "User";
    age?: number | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    token?: string | null;
    userId?: string | null;
    address?: Array<{
      __typename?: "Address";
      addressId?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      city?: string | null;
      country?: string | null;
      parish?: string | null;
      primary?: boolean | null;
      userId?: string | null;
      zip?: string | null;
    }> | null;
  } | null;
};

export type EditUserMutationVariables = Exact<{
  user?: InputMaybe<EditUserInput>;
}>;

export type EditUserMutation = {
  __typename?: "Mutation";
  editUser?: {
    __typename?: "User";
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
  __typename?: "Mutation";
  deleteUser?: { __typename?: "DeleteAddressResult"; success: boolean } | null;
};

export type CreateAddressMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  address?: InputMaybe<CreateAddressInput>;
}>;

export type CreateAddressMutation = {
  __typename?: "Mutation";
  createAddress?: {
    __typename?: "Address";
    addressId?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    parish?: string | null;
    country?: string | null;
    zip?: string | null;
    primary?: boolean | null;
  } | null;
};

export type EditAddressMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  address?: InputMaybe<EditAddressInput>;
}>;

export type EditAddressMutation = {
  __typename?: "Mutation";
  editAddress?: {
    __typename?: "Address";
    addressId?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    parish?: string | null;
    country?: string | null;
    zip?: string | null;
    primary?: boolean | null;
  } | null;
};

export type DeleteAddressMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
  addressId: Scalars["String"]["input"];
}>;

export type DeleteAddressMutation = {
  __typename?: "Mutation";
  deleteAddress?: {
    __typename?: "DeleteAddressResult";
    success: boolean;
  } | null;
};

export type SignInQueryVariables = Exact<{
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type SignInQuery = {
  __typename?: "Query";
  signIn?: {
    __typename?: "User";
    userId?: string | null;
    token?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    age?: number | null;
    address?: Array<{
      __typename?: "Address";
      addressId?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      city?: string | null;
      parish?: string | null;
      country?: string | null;
      zip?: string | null;
      primary?: boolean | null;
    }> | null;
  } | null;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
  __typename?: "Query";
  getAllUsers?: Array<{
    __typename?: "User";
    age?: number | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    token?: string | null;
    userId?: string | null;
    address?: Array<{
      __typename?: "Address";
      addressId?: string | null;
      addressLine1?: string | null;
      addressLine2?: string | null;
      city?: string | null;
      country?: string | null;
      parish?: string | null;
      primary?: boolean | null;
      userId?: string | null;
      zip?: string | null;
    }> | null;
  } | null> | null;
};

export type GetAddressQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetAddressQuery = {
  __typename?: "Query";
  getUserAddress?: Array<{
    __typename?: "Address";
    addressId?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    parish?: string | null;
    country?: string | null;
    zip?: string | null;
    primary?: boolean | null;
  }> | null;
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(
    EditUserDocument,
    options,
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options,
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
  >,
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditAddressMutation, EditAddressMutationVariables>(
    EditAddressDocument,
    options,
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
  >,
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
  baseOptions?: Apollo.QueryHookOptions<SignInQuery, SignInQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SignInQuery, SignInQueryVariables>(
    SignInDocument,
    options,
  );
}
export function useSignInLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SignInQuery, SignInQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SignInQuery, SignInQueryVariables>(
    SignInDocument,
    options,
  );
}
export function useSignInSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SignInQuery,
    SignInQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SignInQuery, SignInQueryVariables>(
    SignInDocument,
    options,
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options,
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options,
  );
}
export function useGetAllUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options,
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
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAddressQuery, GetAddressQueryVariables>(
    GetAddressDocument,
    options,
  );
}
export function useGetAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAddressQuery,
    GetAddressQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAddressQuery, GetAddressQueryVariables>(
    GetAddressDocument,
    options,
  );
}
export function useGetAddressSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetAddressQuery,
    GetAddressQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAddressQuery, GetAddressQueryVariables>(
    GetAddressDocument,
    options,
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
