import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import LandingPage from "./pages/LandingPage";
import SignupForm from "./components/landing/SignupForm";
import LoginForm from "./components/landing/LoginForm";

import Feedback from "./pages/dashboard/Feedback";
import DashboardLayout from "./layouts/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Menu from "./pages/dashboard/Menu";
import History from "./pages/dashboard/History";
import Payment from "./pages/dashboard/Payment";
import Support from "./pages/dashboard/Support";
import Language from "./pages/dashboard/Language";

export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>

          
            <Route
              path="/customer"
              element={<DashboardLayout type="customer" />}
            >
              <Route path="feedback" element={<Feedback />} />
              <Route
                path="profile"
                element={<Profile />}
                children={undefined}
              />
              <Route index path="menu" element={<Menu />} />
              <Route path="history" element={<History />} />
              <Route path="payment" element={<Payment />} />
              <Route path="support" element={<Support />} />
              <Route path="language" element={<Language />} />
            </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
