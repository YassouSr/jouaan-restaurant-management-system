import React from "react";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";
import sharedStyles from "../../styles/pages/pages.module.css";

const Language = () => {
  const { defaultLanguage } = useContext(MainContext);
  return (
    <React.Fragment>
      <h2 className={sharedStyles.heading}>Language</h2>

      <p>Choose you're default language : {defaultLanguage}</p>
    </React.Fragment>
  );
};

export default Language;
