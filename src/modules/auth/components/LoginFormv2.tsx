import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginParams } from "../../../types";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
type LoginFormProps = {
  onLogin(values: ILoginParams): void;

  loading: boolean;
};
export default function LoginFormv2({ onLogin, loading }: LoginFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginParams>({
    criteriaMode: "all",
  });
  const { t } = useTranslation();
  const onSubmit: SubmitHandler<ILoginParams> = (data) => {
    onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
      <div className="flex flex-col">
        <label htmlFor="inputEmail" className="text-left mt-8 mb-2">
          {t("email")}
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("email", {
            required: {
              value: true,
              message: "requiredEmail",
            },
            pattern: {
              value:
                /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "invalidEmail",
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
                {t(`${message}`)}
              </p>
            ))
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="inputEmail" className="text-left mt-8 mb-2">
          {t("password")}
        </label>
        <input
          {...register("password", {
            required: {
              value: true,
              message: "requiredPassword",
            },
            minLength: {
              value: 4,
              message: "invalidPassword",
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
            Object.entries(messages).map(([type, message]) => {
              return (
                <p className="text-left mt-2 text-red-500" key={type}>
                  {t(`${message}`)}
                </p>
              );
            })
          }
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-lg px-10 py-2.5 disabled:bg-blue-300 disabled:cursor-not-allowed "
          disabled={loading}
        >
          {t("logIn")}
        </button>
      </div>
    </form>
  );
}
