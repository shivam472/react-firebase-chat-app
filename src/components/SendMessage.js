import React, { useState, useContext } from "react";
import AuthContext from "./context/auth-context";
import SendIcon from "@material-ui/icons/Send";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import firebase from "firebase";
import { auth, db } from "../firebase";
import classes from "./SendMessage.module.css";

const SendMessage = ({ scroll }) => {
  const authCtx = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [msgIsValid, setMsgIsValid] = useState(false);

  const validateMessageHandler = (e) => {
    setMsg(e.target.value);
    if (e.target.value.trim() !== "") {
      setMsgIsValid(true);
    } else {
      setMsgIsValid(false);
    }
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (msgIsValid) {
      const { uid, photoURL } = auth.currentUser;

      // const messageRef = db.collection("messages").doc();
      const roomRef = db.collection("rooms").doc(authCtx.roomID);

      await roomRef
        .set({
          id: authCtx.roomID,
        })
        .then(() => {
          console.log("document successfully written");
        })
        .catch((err) => console.log(err));

      const messageRef = roomRef.collection("messages").doc();
      const id = messageRef.id;

      await messageRef
        .set({
          text: msg.trim(),
          photoURL,
          uid,
          id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log("document successfully written");
        })
        .catch((err) => {
          console.log(err);
        });

      setMsg("");
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  };

  return (
    <div className={classes["form-container"]}>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <Input
          value={msg}
          onChange={validateMessageHandler}
          type="text"
          placeholder="Type a message"
          className={classes.Input}
        />

        <Button
          type="submit"
          style={{ backgroundColor: "#fff", marginLeft: "2px", padding: "0" }}
        >
          <SendIcon
            color="primary"
            style={{ cursor: "pointer", marginLeft: "3px" }}
          />
        </Button>
      </form>
    </div>
  );
};

export default SendMessage;
