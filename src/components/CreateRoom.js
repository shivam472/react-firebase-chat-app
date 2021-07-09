import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import AuthContext from "./context/auth-context";
import { db } from "../firebase";

const CreateRoom = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const createRoomHandler = () => {
    const roomRef = db.collection("rooms").doc();
    const roomID = roomRef.id;
    authCtx.createRoomID(roomID);
    authCtx.createProfile();
    history.replace("/chat");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={!authCtx.userProfileCreated}
        onClick={createRoomHandler}
      >
        Create Room
      </Button>
    </div>
  );
};

export default CreateRoom;
