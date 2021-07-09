import { Button } from "@material-ui/core";
import firebase from "firebase";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import googleIcon from "../asset/googleIcon.png";

const SignInWithGoogle = () => {
  const history = useHistory();

  const signInWithGoogleHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => {
        console.log("sign in successful");
      })
      .catch((err) => {
        console.log(err);
      });
    history.replace("/chat");
  };

  return (
    <Button
      style={{
        marginTop: "2rem",
        backgroundColor: "#4285f4",
        color: "#fff",
        padding: "2px 8px 2px 2px",
      }}
      onClick={signInWithGoogleHandler}
    >
      <div
        style={{
          height: "35px",
          width: "35px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
          marginLeft: "0",
          borderRadius: "2px",
        }}
      >
        <img
          src={googleIcon}
          alt="google"
          style={{ height: "30px", width: "30px" }}
        />
      </div>
      Sign In With Google
    </Button>
  );
};

export default SignInWithGoogle;
