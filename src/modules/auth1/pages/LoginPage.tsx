import React, { useState } from "react";

import logo from "../../../logo-420-x-108.png";
import LoginForm from "../components/LoginForm";
import { ILoginParams } from "../../../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../../configs/api";
import LoginFormv2 from "../components/LoginFormv2";
export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onLogin = async (value: ILoginParams) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const res = await axios.post(API_PATHS.signIn, {
        email: value.email,
        password: value.password,
      });
      navigate("/home", { replace: true });
    } catch (error) {
      setErrorMessage("Invalid username / password");
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img className="w-60 m-8" src={logo} alt="" />
      {/* <LoginForm
        errorMessage={errorMessage}
        onLogin={onLogin}
        loading={loading}
      /> */}
      <LoginFormv2
        errorMessage={errorMessage}
        onLogin={onLogin}
        loading={loading}
      />
    </div>
  );
}
