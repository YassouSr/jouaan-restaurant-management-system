import Footer from "../components/shared/Footer";
import Navbar from "../components/landing/Navbar";
import { Outlet } from "react-router-dom";
import React from "react";

const LandingLayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default LandingLayout;
