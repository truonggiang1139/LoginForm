import { ILoginParams, ILoginValidation } from "../../types";
const validEmailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email: string) => {
  if (!email) {
    return "Vui lòng nhập địa chỉ email";
  }

  if (!validEmailRegex.test(email)) {
    return "Địa chỉ email không hợp lệ";
  }

  return "";
};

const validatePassword = (password: string) => {
  if (!password) {
    return "Vui lòng nhập mật khẩu";
  }

  if (password.length < 4) {
    return "Mật khẩu tối thiểu 4 ký tự";
  }

  return "";
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};
