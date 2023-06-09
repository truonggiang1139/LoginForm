import React, { lazy, Suspense } from "react";
import "./App.css";

import { ROUTES } from "./configs/routes";
import { Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "./utils/constants";
import "../src/configs/i18n";
import { useTranslation } from "react-i18next";
import ProtectedRoute from "./ProtectedRoute";
import ProductItem from "./modules/auth/pages/ProductItem";
import UserDetail from "./modules/pages/DetailPage/UserDetail";
import PrivateRoute from "./PrivateRoute";
import Product from "./modules/pages/Product";

const HomePage = lazy(() => import("./modules/pages/HomePage"));

const SignUpPage = lazy(() => import("./modules/auth/pages/SignUpPage"));
const LoginPage = lazy(() => import("./modules/auth/pages/LoginPage"));

function App() {
  const auth = Cookies.get(ACCESS_TOKEN_KEY);
  const { i18n } = useTranslation();
  const changLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="App">
      <header className="flex justify-end">
        <div className="mr-52 mt-10 w-36">
          <button
            disabled={i18n.language === "vi"}
            className="hover:cursor-pointer rounded px-3 mr-3 disabled:bg-blue-500 disabled:text-white disabled:cursor-default"
            onClick={() => changLanguage("vi")}
          >
            Vi
          </button>
          <button
            disabled={i18n.language === "en"}
            className="hover:cursor-pointer rounded px-3 mr-3 disabled:bg-blue-500 disabled:text-white disabled:cursor-default"
            onClick={() => changLanguage("en")}
          >
            En
          </button>
        </div>
      </header>
      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path={ROUTES.home} Component={HomePage} />
            <Route path={ROUTES.product} element={<Product />} />
            <Route path={`${ROUTES.product}:id`} element={<ProductItem />} />
            <Route path={`${ROUTES.userDetail}`} element={<UserDetail />} />
          </Route>
          <Route path={ROUTES.signUp} Component={SignUpPage} />

          <Route path={ROUTES.login} element={<ProtectedRoute />}>
            <Route path={ROUTES.login} element={<LoginPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
