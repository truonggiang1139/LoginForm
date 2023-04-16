import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./modules/auth1/pages/LoginPage";
import { ROUTES } from "./configs/routes";
import { Routes, Route } from "react-router-dom";
import HomePage from "./modules/pages/HomePage";
import ContactPage from "./modules/pages/ContactPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path={ROUTES.home} Component={HomePage} />
        <Route path={ROUTES.contact} Component={ContactPage} />
        <Route path={ROUTES.login} Component={LoginPage} />
      </Routes>
    </div>
  );
}

export default App;
