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

import CardView from "../Pages/CareerEnquiry/CardView";
import Qualification from "../Pages/Settings/Qualification";
import UserRights from "../Pages/Settings/userRights";
import NotfoundPage from "../Pages/PageNotFound";
import CreateNewPassword from "../Pages/Auth/CreateNewPassword";
import ResetPassword from "../Pages/Auth/resetPassword";
import HeadOffice from "../Pages/Settings/HeadOffice";
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

          <Route path="/ttid-enquiry">
            <Route path="/ttid-enquiry" element={<TTIDEnquiry />} />
            <Route path="/ttid-enquiry/:id" element={<CardView />} />
          </Route>

          <Route path="/visitor-enquiry">
            <Route path="/visitor-enquiry" element={<VisitorEnquiry />} />
            <Route path="/visitor-enquiry/:id" element={<CardView />} />
          </Route>

          <Route path="/telephonic-enquiry">
            <Route path="/telephonic-enquiry" element={<TelephonicEnquiry />} />
            <Route path="/telephonic-enquiry/:id" element={<CardView />} />
          </Route>

          <Route path="/settings">
            <Route
              path="/settings"
              element={<Navigate to="/settings/headoffice" />}
            />
            <Route path="/settings/headoffice" element={<HeadOffice />} />
            <Route path="/settings/Country" element={<HeadOffice />} />
            <Route path="/settings/qualification" element={<Qualification />} />
            <Route path="/settings/candidate" element={<UserRights />} />
            <Route path="/settings/College" element={<HeadOffice />} />
            <Route path="/settings/branch-master" element={<Qualification />} />
            <Route path="/settings/employee-master" element={<UserRights />} />
            <Route path="/settings/userights" element={<UserRights />} />
          </Route>
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
