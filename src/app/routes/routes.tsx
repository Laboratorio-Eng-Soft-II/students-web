import React from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import { HomePage } from "../pages/home/home.page";
import { LoginPage } from "../pages/login";
import { SignUpPage } from "../pages/sign-up";
import { AppPath } from "./app-path";
import { PositionsPage } from "../pages/positions";

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/*" element={<LoginPage />} />
        <Route path={AppPath.login} element={<LoginPage />} />
        <Route path={AppPath.home} element={<HomePage />} />
        <Route path={AppPath.signUp} element={<SignUpPage />} />
        <Route path={AppPath.positions} element={<PositionsPage />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};
