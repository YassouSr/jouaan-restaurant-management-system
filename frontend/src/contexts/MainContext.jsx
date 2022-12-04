import React from "react";

// Default values for context
const initialState = {
  openSidebar: true,
  counter: 0,
  screenSize: undefined,
  defaultLanguage: 'english'
};

// Context
export const MainContext = React.createContext(initialState);

// Context provider
export const ContextProvider = (props) => {
  const [openSidebar, setOpenSidebar] = React.useState(initialState.openSidebar);
  const [counter, setCounter] = React.useState(initialState.counter);
  const [screenSize, setScreenSize] = React.useState(initialState.screenSize)
  const [defaultLanguage, setDefaultLanguage] = React.useState(initialState.defaultLanguage)
  
  return (
    <MainContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        counter,
        setCounter,
        screenSize,
        setScreenSize,
        defaultLanguage,
        setDefaultLanguage
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
