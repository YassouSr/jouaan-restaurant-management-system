import React from "react";

// Default values for context
const initialState = {
  openSidebar: true,
  counter: 0,
  screenSize: undefined,
  defaultLanguage: "english",
};

// Context
export const MainContext = React.createContext(initialState);

// Context provider
export const MainProvider = (props) => {
  const [openSidebar, setOpenSidebar] = React.useState(
    initialState.openSidebar
  );
  const [counter, setCounter] = React.useState(initialState.counter);
  const [screenSize, setScreenSize] = React.useState(initialState.screenSize);
  const [defaultLanguage, setDefaultLanguage] = React.useState(
    initialState.defaultLanguage
  );

  let contextValues = {
    openSidebar,
    setOpenSidebar,
    counter,
    setCounter,
    screenSize,
    setScreenSize,
    defaultLanguage,
    setDefaultLanguage,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {props.children}
    </MainContext.Provider>
  );
};
