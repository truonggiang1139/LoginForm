import React, { useState } from "react";
import { ISignUpValidation } from "../../../types";
import logo from "../../../logo-420-x-108.png";
import axios from "axios";
import { API_PATHS } from "../../../configs/api";
import SignUpForm from "../components/SignUpForm";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
export default function SignUpPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSignUp = async (value: ISignUpValidation) => {
    try {
      setLoading(true);
      await axios.post(API_PATHS.signUp, value);
      toast.success(t("registerSuccess"));
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 500);
    } catch (error) {
      toast.error(t("registerError"));
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
      <SignUpForm loading={loading} onSignUp={onSignUp} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
