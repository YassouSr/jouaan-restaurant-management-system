import React from "react";
import Delivery from "../components/landing/Delivery";
import HeroSection from "../components/landing/HeroSection";
import Location from "../components/landing/Location";
import Menu from "../components/landing/Menu";

const LandingPage = () => {
  return (
    <React.Fragment>
      <HeroSection />
      <Menu />
      <Location />
      <Delivery />
    </React.Fragment>
  );
};

export default LandingPage;
