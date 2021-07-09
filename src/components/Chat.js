import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import SignOut from "./SignOut";
import { db, auth } from "../firebase";
import SendMessage from "./SendMessage";
import AuthContext from "./context/auth-context";
import classes from "./Chat.module.css";
import { Button } from "@material-ui/core";

const Chat = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  const updateMessagesHandler = useCallback(async () => {
    // await db
    //   .collection("rooms")
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       console.log(doc.id);
    //       console.log(doc.data());
    //     });
    //   });

    db.collection("rooms")
      .doc(authCtx.roomID)
      .collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [authCtx.roomID]);

  useEffect(() => {
    updateMessagesHandler();
  }, [updateMessagesHandler]);

  return (
    <>
      <div style={{ marginTop: "1rem", color: "red", fontWeight: "550" }}>
        roomID:{" "}
        <p style={{ display: "inline", color: "#2b2b2b" }}>{authCtx.roomID}</p>
        <p style={{ marginBottom: "0" }}>
          (send one message first and then share the room ID)
        </p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={classes["button-section"]}>
          <div>
            <SignOut />
          </div>
          <div className={classes["profile-section"]}>
            <Button
              variant="contained"
              style={{
                margin: "1.2rem",
                marginLeft: "1rem",
                backgroundColor: "#4285f4",
                color: "#fff",
              }}
              onClick={() => {
                history.replace("/profile");
              }}
            >
              Profile
            </Button>
          </div>
        </div>
      </div>

      <div className={classes["chat-container"]}>
        <div className={classes["messagesContainer"]} ref={scroll}>
          {messages.map(({ text, photoURL, uid, id }, index) => (
            <div key={index}>
              <div
                className={`${classes.message} ${
                  classes[
                    `${uid === auth.currentUser.uid ? "sent" : "received"}`
                  ]
                }`}
              >
                <img src={photoURL} alt="user" />
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <SendMessage scroll={scroll} />
      </div>
    </>
  );
};

export default Chat;
