export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  userLogin: UserRegister;
  userRegister: UserRegister;
};


export type MutationUserLoginArgs = {
  data: UserRegisterInputGraphQl;
};


export type MutationUserRegisterArgs = {
  data: UserRegisterInputGraphQl;
};

export type Query = {
  __typename?: 'Query';
  helloWorld?: Maybe<Scalars['String']>;
  sayHi: Scalars['String'];
  userMe: UserGraphQl;
};


export type QuerySayHiArgs = {
  msg?: InputMaybe<Scalars['String']>;
};

export type UserGraphQl = {
  __typename?: 'UserGraphQL';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  userName: Scalars['String'];
};

export type UserRegister = {
  __typename?: 'UserRegister';
  token: Scalars['String'];
  user: UserGraphQl;
};

export type UserRegisterInputGraphQl = {
  password: Scalars['String'];
  userName: Scalars['String'];
};
