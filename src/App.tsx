import React from "react";
import "./App.css";
import LoginPage from "./modules/auth/pages/LoginPage";
import { ROUTES } from "./configs/routes";
import { Routes, Route } from "react-router-dom";
import HomePage from "./modules/pages/HomePage";
import ContactPage from "./modules/pages/ContactPage";
import SignUp from "./modules/pages/SignUp";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path={ROUTES.signUp} Component={SignUp} />
        <Route path={ROUTES.home} Component={HomePage} />
        <Route path={ROUTES.contact} Component={ContactPage} />
        <Route path={ROUTES.login} Component={LoginPage} />
      </Routes>
    </div>
  );
}

export default App;
