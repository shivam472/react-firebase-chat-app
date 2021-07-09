import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";
import AuthContext from "./context/auth-context";

const SignOut = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Button
      style={{
        margin: "0",
        marginRight: "1rem",
        backgroundColor: "#4285f4",
        color: "#fff",
      }}
      variant="contained"
      onClick={() => {
        authCtx.userLoggedOut();
        auth.signOut();
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOut;
