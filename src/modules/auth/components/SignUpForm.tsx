import { useForm, SubmitHandler } from "react-hook-form";
import { ISignUpValidation, RegionType, StateType } from "../../../types";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_PATHS } from "../../../configs/api";
import { useTranslation } from "react-i18next";

type SignUpFormType = {
  loading: boolean;
  onSignUp: (value: ISignUpValidation) => Promise<void>;
};
export default function SignUpForm({ loading, onSignUp }: SignUpFormType) {
  const [regions, setRegions] = useState<RegionType[]>([]);
  const [states, setStates] = useState<StateType[]>([]);
  const { t } = useTranslation();

  const getStateLocation = async (value: string) => {
    const res = await axios.get(`${API_PATHS.locationByID}${value}`);
    setStates(res.data.data);
  };
  useEffect(() => {
    const getLocation = async () => {
      const res = await axios.get(API_PATHS.location);
      setRegions(res.data.data);
    };
    getLocation();
  }, []);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignUpValidation>({
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<ISignUpValidation> = (data) => {
    onSignUp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 ">
      <div className="flex flex-col">
        <label htmlFor="inputEmail" className="text-left mt-2 ">
          {t("email")}
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("email", {
            required: {
              value: true,
              message: t("requiredEmail"),
            },
            pattern: {
              value:
                /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t("invalidEmail"),
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
        <label htmlFor="inputPassword" className="text-left mt-2 ">
          {t("password")}
        </label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", {
            required: {
              value: true,
              message: t("requiredPassword"),
            },
            minLength: {
              value: 4,
              message: t("invalidPassword"),
            },
          })}
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
      <div className="flex flex-col">
        <label className="text-left mt-2 ">{t("confirmPassword")}</label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("repeatPassword", {
            required: {
              value: true,
              message: t("requiredPassword"),
            },
            validate: (value: string) => {
              if (watch("password") !== value && value) {
                return `${t("notMatchPassword")}`;
              }
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="repeatPassword"
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
        <label htmlFor="inputName" className="text-left mt-2 ">
          {t("name")}
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("name", {
            required: `${t("requiredName")}`,
          })}
        />
        <ErrorMessage
          errors={errors}
          name="name"
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
        <label htmlFor="inputGender" className="text-left mt-2 ">
          {t("gender")}
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={""}
          {...register("gender", {
            required: `${t("requiredGender")}`,
          })}
        >
          <option value="" hidden>
            --Select an option--
          </option>
          <option value="Male">{t("male")}</option>
          <option value="Female">{t("female")}</option>
        </select>
        <ErrorMessage
          errors={errors}
          name="gender"
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
        <label htmlFor="inputRegion" className="text-left mt-2 ">
          {t("region")}
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("region", {
            required: `${t("requiredRegion")}`,
          })}
          onChange={(e) => getStateLocation(e.target.value)}
        >
          <option value="" hidden>
            --Select an option--
          </option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name="region"
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

      {!!states.length && (
        <div className="flex flex-col">
          <label htmlFor="inputState" className="text-left mt-2 ">
            {t("state")}
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("state", {
              required: `${t("requiredState")}`,
            })}
          >
            <option value="" hidden>
              --Select an option--
            </option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          <ErrorMessage
            errors={errors}
            name="state"
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
      )}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-lg px-10 py-2.5 disabled:bg-blue-300 disabled:cursor-not-allowed "
          disabled={loading}
        >
          {t("register")}
        </button>
      </div>
    </form>
  );
}
