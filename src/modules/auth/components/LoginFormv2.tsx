import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginParams, ILoginValidation } from "../../../types";
import { ErrorMessage } from "@hookform/error-message";

type LoginFormProps = {
  onLogin(values: ILoginParams): void;
  errorMessage: string;
  loading: boolean;
};
export default function LoginFormv2({
  errorMessage,
  onLogin,
  loading,
}: LoginFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginParams>({
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<ILoginParams> = (data) => {
    onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
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
          {...register("email", {
            required: "Vui lòng nhập địa chỉ email",
            pattern: {
              value:
                /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Địa chỉ email không hợp lệ",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p className="text-left mt-2 text-red-500" key={type}>
                {message}
              </p>
            ))
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="inputEmail" className="text-left mt-8 mb-2">
          Địa chỉ Email
        </label>
        <input
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 4,
              message: "Mật khẩu tối thiểu 4 ký tự",
            },
          })}
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p className="text-left mt-2 text-red-500" key={type}>
                {message}
              </p>
            ))
          }
        />
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
