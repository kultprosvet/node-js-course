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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BrandGraphQl = {
  __typename?: 'BrandGraphQL';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ImageGraphQl = {
  __typename?: 'ImageGraphQL';
  id: Scalars['Float'];
  url: Scalars['String'];
};

export type ImageInputGraphQl = {
  file: Scalars['Upload'];
  laptopId: Scalars['Int'];
};

export type LaptopGraphQl = {
  __typename?: 'LaptopGraphQL';
  brand?: Maybe<BrandGraphQl>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<ImageGraphQl>>;
  model: Scalars['String'];
  price: Scalars['Float'];
};

export type LaptopInputGraphQl = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  model?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  imageAdd: Scalars['Boolean'];
  updateLaptop: LaptopGraphQl;
  upload: Scalars['Boolean'];
  userLogin: UserRegister;
  userRegister: UserRegister;
};


export type MutationImageAddArgs = {
  data: ImageInputGraphQl;
};


export type MutationUpdateLaptopArgs = {
  data: LaptopInputGraphQl;
};


export type MutationUploadArgs = {
  file: Scalars['Upload'];
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
  laptop: LaptopGraphQl;
  laptopList: Array<LaptopGraphQl>;
  sayHi: Scalars['String'];
  userMe: UserGraphQl;
};


export type QueryLaptopArgs = {
  id: Scalars['Int'];
};


export type QuerySayHiArgs = {
  msg?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  laptopUpdates: LaptopGraphQl;
  laptopUpdatesById: LaptopGraphQl;
};


export type SubscriptionLaptopUpdatesByIdArgs = {
  id: Scalars['Int'];
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
