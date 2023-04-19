import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./configs/routes";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "./utils/constants";

const ProtectedRoute = () => {
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  return !auth ? <Outlet /> : <Navigate to={ROUTES.home} replace />;
};
export default ProtectedRoute;
