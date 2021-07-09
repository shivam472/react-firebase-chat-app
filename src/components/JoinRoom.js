import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./context/auth-context";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { db } from "../firebase";

const JoinRoom = () => {
  const authCtx = useContext(AuthContext);
  const roomInputRef = useRef();
  const history = useHistory();
  const [roomDoesNotExist, setRoomDoesNotExist] = useState(false);

  const joinRoomHandler = async () => {
    const enteredRoomID = roomInputRef.current.value;
    // await db
    //   .collection("rooms")
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       console.log(doc.id);
    //       console.log(doc.data());
    //     });
    //   });
    const roomExist = await db
      .collection("rooms")
      .doc(enteredRoomID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          return true;
        } else {
          return false;
        }
      });

    if (roomExist) {
      const roomID = enteredRoomID;
      authCtx.createRoomID(roomID);
      history.replace("/chat");
    } else {
      setRoomDoesNotExist(true);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "20rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Input
          placeholder="Enter Room ID"
          inputRef={roomInputRef}
          onBlur={() => setRoomDoesNotExist(false)}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!authCtx.userProfileCreated}
          onClick={joinRoomHandler}
        >
          Join Room
        </Button>
      </div>
      {roomDoesNotExist && (
        <p style={{ color: "red", display: "block" }}>Room does not exist!</p>
      )}
    </div>
  );
};

export default JoinRoom;
