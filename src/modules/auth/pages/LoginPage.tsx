import React, { useState } from "react";

import logo from "../../../logo-420-x-108.png";
import { ILoginParams } from "../../../types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../../../configs/api";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import LoginFormv2 from "../components/LoginFormv2";
import { useTranslation } from "react-i18next";
export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const onLogin = async (value: ILoginParams) => {
    try {
      setLoading(true);
      const res = await axios.post(API_PATHS.signIn, {
        email: value.email,
        password: value.password,
      });

      Cookies.set("token", res.data.data.token);
      toast.success(`${t("logInSuccess")}`);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 1000);
    } catch (error) {
      toast.error(`${t("LogInError")}`);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img className="w-60 m-8" src={logo} alt="" />

      <LoginFormv2 onLogin={onLogin} loading={loading} />
      <Link to={"/sign-up"}>{t("register")}</Link>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
