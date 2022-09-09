import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import NotfoundPage from "../Pages/PageNotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Signin />} />
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
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
