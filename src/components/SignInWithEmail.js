import React, { useState, useRef } from "react";
import classes from "./SignInWithEmail.module.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const SignInWithEmail = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    if (isSigningUp) {
      auth
        .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
        .then(() => {
          console.log("signup successful");
          console.log("user is logged in");
        })
        .catch((err) => {
          alert(err.message);
        });
      history.replace("/profile");
    } else {
      auth
        .signInWithEmailAndPassword(enteredEmail, enteredPassword)
        .then(() => {
          console.log("user is logged in");
        })
        .catch((err) => {
          alert(err.message);
        });
      setIsLoading(false);
      history.replace("/profile");
    }
  };

  return (
    <div className={classes.container}>
      <h1>{isSigningUp ? "Sign Up" : "Log In"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="user@example.com"
            required
            ref={emailInputRef}
          />
        </div>

        <div className={classes.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        {!isLoading && (
          <Button
            style={{
              marginTop: "2rem",
              backgroundColor: "#4285f4",
              color: "#fff",
            }}
            variant="contained"
            type="submit"
          >
            {isSigningUp ? "Sign Up" : "Log In"}
          </Button>
        )}
        {isLoading && <p>Sending Request...</p>}
      </form>

      {!isSigningUp && (
        <p>
          Need an accout?{" "}
          <Button color="primary" onClick={() => setIsSigningUp(true)}>
            Sign Up
          </Button>
        </p>
      )}
      {isSigningUp && (
        <p>
          Already have an account?
          <Button color="primary" onClick={() => setIsSigningUp(false)}>
            Log In
          </Button>
        </p>
      )}
    </div>
  );
};

export default SignInWithEmail;
