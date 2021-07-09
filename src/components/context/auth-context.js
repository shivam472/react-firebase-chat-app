import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [isCreated, setIsCreated] = useState(false);
  const [roomID, setRoomID] = useState(null);

  const createProfile = () => {
    setIsCreated(true);
  };

  const userLoggedOut = () => {
    setIsCreated(false);
  };

  const createRoomID = (id) => {
    setRoomID(id);
  };
  const contextObj = {
    userProfileCreated: isCreated,
    roomID,
    createProfile,
    createRoomID,
    userLoggedOut,
  };

  return (
    <AuthContext.Provider value={contextObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
