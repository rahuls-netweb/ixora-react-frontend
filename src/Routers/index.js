import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRouter";
import PrivateRoute from "./PrivateRoute";

import Signin from "../Pages/Auth/SignIn";
import CreateNewPassword from "../Pages/Auth/CreateNewPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";

import Dashboard from "../Pages/Dashboard";
import CareerEnquiry from "../Pages/CareerEnquiry/index";
import CardView from "../Pages/CareerEnquiry/CardView";
import TTIDEnquiry from "../Pages/TTIDEnquiry";
import VisitorEnquiry from "../Pages/VisitorEnquiry";
import TelephonicEnquiry from "../Pages/TelephonicEnquiry";
import CCIDassigned from "../Pages/CCIDAssigned";


import NotfoundPage from "../Pages/PageNotFound";
import RootSettings from "../Pages/Settings/RootSettings";

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
          <Route path="/CCID-assigned" element={<CCIDassigned />} />
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
            <Route path="/settings/:id" element={<RootSettings />} />
            {/* <Route path="/settings/country" element={<RootSettings />} />
            <Route path="/settings/qualification" element={<RootSettings />} />
            <Route path="/settings/candidate" element={<RootSettings />} />
            <Route
              path="/settings/college-university"
              element={<RootSettings />}
            />
            <Route path="/settings/branch-master" element={<RootSettings />} />
            <Route
              path="/settings/employee-master"
              element={<RootSettings />}
            /> */}
            {/* <Route path="/settings/user-rights" element={<UserRights />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
