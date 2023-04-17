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
  rePassword: string;
  name: string;
  gender: "" | "Nam" | "Nữ";
  region: RegionType[];
  state: StateType[];
};
