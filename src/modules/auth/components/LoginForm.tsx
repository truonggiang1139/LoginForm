import React, { useState } from "react";
import { ILoginParams } from "../../../types";
import { ILoginValidation } from "../../../types";
import { validLogin, validateLogin } from "../utils";
type LoginFormProps = {
  onLogin(values: ILoginParams): void;
  errorMessage: string;
  loading: boolean;
};
export default function LoginForm({
  errorMessage,
  onLogin,
  loading,
}: LoginFormProps) {
  const [formValues, setFormValues] = useState<ILoginParams>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [validate, setValidate] = React.useState<ILoginValidation>();
  const onSubmit = () => {
    const validate = validateLogin(formValues);
    setValidate(validate);
    if (!validLogin(validate)) {
      return;
    }
    onLogin(formValues);
  };
  return (
    <form
      className="w-1/4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {!!errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative "
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <div className="flex flex-col">
        <label htmlFor="inputEmail" className="text-left mt-8 mb-2">
          Địa chỉ Email
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="inputEmail"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />

        {!!validate?.email && (
          <small className="text-left mt-2 text-red-500">
            {validate.email}{" "}
          </small>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="inputPassword" className="text-left mt-4 mb-2">
          Mật khẩu
        </label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="inputPassword"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
        />

        {!!validate?.password && (
          <small className="text-left mt-2 text-red-500">
            {validate.password}
          </small>
        )}
      </div>

      <div className="flex items-center mt-4">
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 "
          id="default-checkbox"
          type="checkbox"
          value=""
          checked={formValues.rememberMe}
          onChange={(e) =>
            setFormValues({ ...formValues, rememberMe: !!e.target.checked })
          }
        />
        <label className="ml-1">Lưu thông tin đăng nhập</label>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-lg px-10 py-2.5 disabled:bg-blue-300 disabled:cursor-not-allowed "
          disabled={loading}
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
}
