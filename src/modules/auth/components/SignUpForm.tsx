import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  ILoginParams,
  ISignUpValidation,
  RegionType,
  StateType,
} from "../../../types";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_PATHS } from "../../../configs/api";

export default function SignUpForm() {
  const [regions, setRegions] = useState<RegionType[]>([]);
  const [states, setStates] = useState<StateType[]>([]);

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
    formState: { errors },
    handleSubmit,
  } = useForm<ISignUpValidation>({
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<ISignUpValidation> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
      <div className="flex flex-col">
        <label htmlFor="inputEmail" className="text-left mt-2 ">
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
        <label htmlFor="inputPassword" className="text-left mt-2 ">
          Mật khẩu
        </label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 4,
              message: "Mật khẩu tối thiểu 4 ký tự",
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
        <label className="text-left mt-2 ">Xác nhận lại mật khẩu</label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("rePassword", {
            required: "Vui lòng nhập mật khẩu",
          })}
        />
        <ErrorMessage
          errors={errors}
          name="rePassword"
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
          Họ và tên
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("name", {
            required: "Vui lòng nhập tên",
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
          Giới tính
        </label>
        <select
          defaultValue={""}
          {...register("gender", {
            required: "Vui lòng nhập giới tính",
          })}
        >
          <option value="" hidden>
            --Select an option--
          </option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
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
          Quốc gia
        </label>
        <select
          {...register("region", {
            required: "Vui lòng nhập quốc gia",
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
            Thành phố
          </label>
          <select
            {...register("state", {
              required: "Vui lòng nhập thành phố",
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
          disabled={false}
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
}
