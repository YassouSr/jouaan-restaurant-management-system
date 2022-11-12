import React from "react";
import Delivery from "../components/landing/Delivery";
import HeroSection from "../components/landing/HeroSection";
import Location from "../components/landing/Location";
import Menu from "../components/landing/Menu";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Menu />
      <Location />
      <Delivery />
    </div>
  );
};

export default LandingPage;
