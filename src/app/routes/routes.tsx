import React from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import { HomePage } from "../pages/home/home.page";
import { LoginPage } from "../pages/login";
import { SignUpPage } from "../pages/sign-up";
import { ProfilePage } from "../pages/profile";
import { AppPath } from "./app-path";
import { PositionsPage } from "../pages/positions";
import { PositionDetailsPage } from "../pages/position-details";
import { CompanyFeedbackPage } from "../pages/company-feedback";
import { EnrollmentPage } from "../pages/apply";

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/*" element={<LoginPage />} />
        <Route path={AppPath.login} element={<LoginPage />} />
        <Route path={AppPath.home} element={<HomePage />} />
        <Route path={AppPath.signUp} element={<SignUpPage />} />
        <Route path={AppPath.profile} element={<ProfilePage />} />
        <Route path={AppPath.positions} element={<PositionsPage />} />
        <Route
          path={AppPath.positions + "/:id"}
          element={<PositionDetailsPage />}
        />
        <Route
          path={AppPath.companyFeedback}
          element={<CompanyFeedbackPage />}
        />
        <Route
          path={AppPath.applyPage + "/:positionId"}
          element={<EnrollmentPage />}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
};
