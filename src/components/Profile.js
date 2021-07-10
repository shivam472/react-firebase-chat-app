import { useState, useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import { auth, storage } from "../firebase";
import AuthContext from "./context/auth-context";
import classes from "./Profile.module.css";
import blankProfileImage from "../asset/blankProfileImage.png";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import SignOut from "./SignOut";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(blankProfileImage);
  const [imgLoading, setImgLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [imgUploadsuccess, setImgUploadSuccess] = useState(false);
  const [choosePhotoClicked, setChoosePhotoClicked] = useState(false);

  const [file, setFile] = useState(null);

  const user = auth.currentUser;

  useEffect(() => {
    const { photoURL } = auth.currentUser;
    if (photoURL) {
      setProfileImage(photoURL);
      setImgLoading(false);
    }
  }, []);

  const imageChangeHandler = (e) => {
    setImgUploadSuccess(false);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
        setImgLoading(false);
      }
    };
    setFile(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  let uploadHandler;
  if (user.photoURL && !choosePhotoClicked) {
    uploadHandler = (e) => {
      e.preventDefault();
      authCtx.createProfile();
      setImgUploadSuccess(true);
    };
  } else {
    uploadHandler = (e) => {
      e.preventDefault();
      setIsUploading(true);
      const storageRef = storage.ref(`/images/${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (err) => {
          console.log(err);
        },
        () => {
          // upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            user.updateProfile({ photoURL: downloadURL });
          });
        }
      );

      setIsUploading(false);
      authCtx.createProfile();
      setImgUploadSuccess(true);
      //   console.log("profile updated");
    };
  }

  return (
    <div className={classes.container}>
      <div className={classes.signout}>
        <SignOut />
      </div>

      <section className={classes["profile-container"]}>
        <form className={classes.form}>
          <h1>Add a Profile Photo</h1>
          {imgUploadsuccess && (
            <p style={{ color: "green", fontWeight: "550" }}>
              Upload SuccessFull!
            </p>
          )}
          <div className={classes["img-holder"]}>
            <img src={profileImage} className={classes.img} alt="user" />
          </div>
          <input
            type="file"
            accept="image/*"
            className={classes.input}
            id="input"
            onChange={imageChangeHandler}
          />

          {!isUploading && (
            <label
              htmlFor="input"
              className={classes.label}
              onClick={() => setChoosePhotoClicked(true)}
            >
              <AddPhotoAlternateIcon /> Choose your photo
            </label>
          )}
          {isUploading && <p>Uploading...</p>}

          <Button
            variant="contained"
            color="primary"
            disabled={imgLoading}
            onClick={uploadHandler}
          >
            upload
          </Button>
        </form>
      </section>
      <div className={classes["room-container"]}>
        <JoinRoom />
        <CreateRoom />
      </div>
    </div>
  );
};

export default Profile;
