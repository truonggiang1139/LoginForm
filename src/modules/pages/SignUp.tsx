import React, { useEffect, useState } from "react";
import { ILoginParams, ISignUpValidation } from "../../types";
import { ILoginValidation } from "../../types";
import { validLogin, validateLogin } from "../auth/utils";
import axios from "axios";
import { API_PATHS } from "../../configs/api";
import { get } from "lodash";
import SignUpForm from "../auth/components/SignUpForm";

export default function SignUp() {
  const gender = ["Nam", "Nữ"];
  const [formValues, setFormValues] = useState<ISignUpValidation>({
    email: "",
    password: "",
    rePassword: "",
    name: "",
    gender: "",
    region: [],
    state: [],
  });
  const getLocationState = async (id: string) => {
    const res = await axios.get(`${API_PATHS.location}?pid=${id}`);
    setFormValues((prev) => ({ ...prev, state: res.data.data }));
  };
  useEffect(() => {
    const getLocation = async () => {
      const res = await axios.get(API_PATHS.location);
      setFormValues((prev) => ({ ...prev, region: res.data.data }));
    };
    getLocation();
  }, []);
  return (
    // <form
    //   className="w-1/4 mx-auto"
    //   noValidate
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //   }}
    // >
    //   <div className="flex flex-col">
    //     <label htmlFor="inputEmail" className="text-left mt-8 mb-2">
    //       Địa chỉ Email
    //     </label>
    //     <input
    //       type="text"
    //       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       id="inputEmail"
    //       value={formValues.email}
    //       onChange={(e) =>
    //         setFormValues({ ...formValues, email: e.target.value })
    //       }
    //     />
    //   </div>

    //   <div className="flex flex-col">
    //     <label htmlFor="inputPassword" className="text-left mt-4 mb-2">
    //       Mật khẩu
    //     </label>
    //     <input
    //       type="password"
    //       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       id="inputPassword"
    //       value={formValues.password}
    //       onChange={(e) =>
    //         setFormValues({ ...formValues, password: e.target.value })
    //       }
    //     />
    //   </div>

    //   <div className="flex flex-col">
    //     <label htmlFor="inputPassword" className="text-left mt-4 mb-2">
    //       Xác nhạn lại mật khẩu
    //     </label>
    //     <input
    //       type="password"
    //       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       id="inputPassword"
    //       value={formValues.rePassword}
    //       onChange={(e) =>
    //         setFormValues({ ...formValues, rePassword: e.target.value })
    //       }
    //     />
    //   </div>

    //   <div className="flex flex-col">
    //     <label htmlFor="inputPassword" className="text-left mt-4 mb-2">
    //       Họ và tên
    //     </label>
    //     <input
    //       type="text"
    //       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       id="inputPassword"
    //       value={formValues.name}
    //       onChange={(e) =>
    //         setFormValues({ ...formValues, name: e.target.value })
    //       }
    //     />
    //   </div>
    //   <div className="flex flex-col">
    //     <label htmlFor="inputPassword" className="text-left mt-4 mb-2">
    //       Giới tính
    //     </label>
    //     <select>
    //       <option value="" selected disabled hidden>
    //         --Select an option
    //       </option>
    //       {gender.map((item) => (
    //         <option key={item} value={item}>
    //           {item}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //   <div className="flex flex-col">
    //     <label htmlFor="inputPassword" className="text-left mt-4 mb-2">
    //       Quốc gia
    //     </label>
    //     <select
    //       defaultValue={"--select an option--"}
    //       onChange={(e) => {
    //         getLocationState(e.target.value);
    //       }}
    //     >
    //       <option value="" selected disabled hidden>
    //         --Select an option
    //       </option>
    //       {formValues.region.map((item) => (
    //         <option key={item.id} value={item.id}>
    //           {item.name}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   {!!formValues.state.length && (
    //     <div className="flex flex-col">
    //       <label htmlFor="inputPassword" className="text-left mt-4 mb-2">
    //         Thành phố
    //       </label>
    //       <select defaultValue={"--select an option--"}>
    //         {formValues.state.map((item) => (
    //           <option key={item.id} value={item.id}>
    //             {item.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   )}
    //   <div className="flex justify-center mt-6">
    //     <button
    //       type="submit"
    //       className="text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-lg px-10 py-2.5 disabled:bg-blue-300 disabled:cursor-not-allowed "
    //       disabled={false}
    //     >
    //       Đăng nhập
    //     </button>
    //   </div>
    // </form>
    <SignUpForm />
  );
}
