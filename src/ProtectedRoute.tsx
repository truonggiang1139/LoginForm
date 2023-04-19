import React from "react";
import { Route, RouteProps, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "./configs/routes";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "./utils/constants";

type ProtectedRouteProps = {
  path: string;
  element: React.ReactNode;
};
const ProtectedRoute = () => {
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  return !auth ? <Outlet /> : <Navigate to={ROUTES.home} replace />;
};
export default ProtectedRoute;
