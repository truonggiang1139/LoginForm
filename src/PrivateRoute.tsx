import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./configs/routes";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "./utils/constants";

const PrivateRoute = () => {
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  return auth ? <Outlet /> : <Navigate to={ROUTES.login} replace />;
};
export default PrivateRoute;
