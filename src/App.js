import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import LandingPage from "./pages/LandingPage";
import SignupForm from "./components/shared/SignupForm";
import LoginForm from "./components/shared/LoginForm";

import HomeD from "./pages/dashboard/Home";
import CustomerDashboardLayout from "./layouts/CustomerDashboardLayout";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
            <Route path='signup' element={<SignupForm />} />
            <Route path='login' element={<LoginForm />} />
          </Route>

          <Route path="/dashboard" element={<CustomerDashboardLayout />}>
            <Route index element={<HomeD />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
