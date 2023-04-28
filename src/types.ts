export type ILoginParams = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ILoginValidation = {
  email: string;
  password: string;
};

export type RegionType = {
  id: number;
  pid: null;
  name: string;
  createAt: string;
};
export type StateType = {
  id: number;
  pid: null;
  name: string;
  createAt: string;
};
export type ISignUpValidation = {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: RegionType[];
  state: StateType[];
};

export type ProductListType = {
  id: number;
  status: string;
  currency: string;
  fundingMethod: string;
  total: number;
  order: string;
  client: string | null;
  invoice: string | null;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
};
export type StatusColorType = {
  [key: string]: string;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  gender: string;
  avatar: string;
  region: number;
  state: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};
