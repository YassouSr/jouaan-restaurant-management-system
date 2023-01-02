// Pages
import * as page from './pages/index'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import LandingLayout from "./layouts/LandingLayout";
import LoginForm from "./components/landing/LoginForm";
import SignupForm from "./components/landing/SignupForm";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<page.LandingPage />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="how-it-works" element={<page.HowItWorks />} />
          </Route>

          <Route path="/customer" element={<DashboardLayout type="customer" />}>
            <Route path="feedback" element={<page.CustomerFeedback />} />
            <Route path="profile" element={<page.CustomerProfile />} />
            <Route index path="menu" element={<page.CustomerMenu />} />
            <Route path="history" element={<page.CustomerHistory />} />
            <Route path="support" element={<page.CustomerSupport />} />
            <Route path="checkout" element={<page.CustomerCheckout />} />
          </Route>

          <Route path="/admin" element={<DashboardLayout type="admin" />}>
            <Route path="statistics" element={<page.AdminStatistics />} />
            <Route index path="profile" element={<page.AdminProfile />} />
            <Route path="signup-staff" element={<page.AdminStaffSignup />} />
            <Route path="list-feedbacks" element={<page.AdminFeedbacksList />} />
            <Route path="list-drivers" element={<page.AdminDrivers />} />
            <Route path="list-chefs" element={<page.AdminChefs />} />
            <Route path="list-customers" element={<page.AdminCustomers />} />
          </Route>

          <Route path="/chef" element={<DashboardLayout type="chef" />}>
            <Route path="statistics" element={<page.ChefStatistics />} />
            <Route path="profile" element={<page.ChefProfile />} />
            <Route index path="list-orders" element={<page.ChefOrdersList />} />
            <Route path="order" element={<page.ChefOrder />} />
            <Route path="history" element={<page.ChefHistory />} />
            <Route path="feedback" element={<page.ChefFeedback />} />
          </Route>

          <Route path="/driver" element={<DashboardLayout type="driver" />}>
            <Route path="statistics" element={<page.DriverStatistics />} />
            <Route path="profile" element={<page.DriverProfile />} />
            <Route index path="list-orders" element={<page.DriverOrdersList />} />
            <Route path="delivery" element={<page.DriverDelivery />} />
            <Route path="history" element={<page.DriverHistory />} />
            <Route path="feedback" element={<page.DriverFeedback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
