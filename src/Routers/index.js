import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRouter";
import PrivateRoute from "./PrivateRoute";

import Signin from "../Pages/Auth/SignIn";
import Dashboard from "../Pages/Dashboard";
import CareerEnquiry from "../Pages/CareerEnquiry/index";
import TTIDEnquiry from "../Pages/TTIDEnquiry";
import VisitorEnquiry from "../Pages/VisitorEnquiry";
import TelephonicEnquiry from "../Pages/TelephonicEnquiry";
import Settings from "../Pages/Settings";
import CardView from "../Pages/CareerEnquiry/CardView";
import Qualification from "../Pages/Settings/Qualification";
import UserRights from "../Pages/Settings/userRights";
import NotfoundPage from "../Pages/PageNotFound";
import CreateNewPassword from "../Pages/Auth/CreateNewPassword";
import ResetPassword from "../Pages/Auth/resetPassword";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Signin />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/career-enquiry">
            <Route path="/career-enquiry" element={<CareerEnquiry />} />
            <Route path="/career-enquiry/:id" element={<CardView />} />
          </Route>

          <Route path="/ttid-enquiry" element={<TTIDEnquiry />} />
          <Route path="/visitor-enquiry" element={<VisitorEnquiry />} />
          <Route path="/telephonic-enquiry" element={<TelephonicEnquiry />} />

          <Route path="/settings">
            <Route
              path="/settings"
              element={<Navigate to="/settings/qualification" />}
            />
            <Route path="/settings/qualification" element={<Qualification />} />
            <Route path="/settings/userights" element={<UserRights />} />
          </Route>
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
