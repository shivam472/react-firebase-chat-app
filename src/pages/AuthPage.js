import React from "react";
import SignInWithGoogle from "../components/SignInWithGoogle";
import SignInWithEmail from "../components/SignInWithEmail";

const AuthPage = () => {
  return (
    <React.Fragment>
      <SignInWithGoogle />
      <SignInWithEmail />
    </React.Fragment>
  );
};

export default AuthPage;
