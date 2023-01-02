import React from "react";

// Default values for context
const initialState = {
  openSidebar: true,
  screenSize: undefined,
  defaultLanguage: "english",
  lastName:"",
  firstName:"",
  userId: null,
  userEmail:"",
  phoneNumber:"",
  userAddressURL:"",
  userAddressMap: {
    "longitude":null,
    "latitude": null
  }
};

// Context
export const MainContext = React.createContext(initialState);

// Context provider
export const MainProvider = (props) => {
  const [openSidebar, setOpenSidebar] = React.useState(
    initialState.openSidebar
  );
  const [screenSize, setScreenSize] = React.useState(initialState.screenSize);
  const [defaultLanguage, setDefaultLanguage] = React.useState(
    initialState.defaultLanguage
  );
  const [lastName, setLastName] = React.useState(
    initialState.lastName
  );  
  const [firstName, setFirstName] = React.useState(
    initialState.firstName
  );
  const [userId, setUserId] = React.useState(
    initialState.userId
  );
  const [userEmail, setUserEmail] = React.useState(
    initialState.userEmail
  );
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialState.phoneNumber
  );
  const [userAddressURL, setUserAddressURL] = React.useState(
    initialState.userAddressURL
  );
  const [userAddressMap, setUserAddressMap] = React.useState(
    initialState.userAddressMap
  );

  let contextValues = {
    openSidebar,
    setOpenSidebar,
    screenSize,
    setScreenSize,
    defaultLanguage,
    setDefaultLanguage,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userId,
    setUserId,
    userEmail,
    setUserEmail,
    phoneNumber,   
    setPhoneNumber,
    userAddressURL,
    setUserAddressURL,
    userAddressMap,
    setUserAddressMap,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {props.children}
    </MainContext.Provider>
  );
};
