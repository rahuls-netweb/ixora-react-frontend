import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from '../Pages/Auth/SignIn';
import Dashboard from '../Pages/Dashboard';
import CareerEnquiry from '../Pages/CareerEnquiry/index';
import TTIDEnquiry from '../Pages/TTIDEnquiry';
import VisitorEnquiry from '../Pages/VisitorEnquiry';
import TelephonicEnquiry from '../Pages/TelephonicEnquiry';
import Settings from '../Pages/Settings';
import CardView from '../Pages/CareerEnquiry/CardView'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/career-enquiry">
                    <Route path="/career-enquiry" element={<CareerEnquiry />} />
                    <Route path="/career-enquiry/:id" element={<CardView />} />
                </Route>
                <Route path="/ttid-enquiry" element={<TTIDEnquiry />} />
                <Route path="/visitor-enquiry" element={<VisitorEnquiry />} />
                <Route path="/telephonic-enquiry" element={<TelephonicEnquiry />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>

    );
}