import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../redux/features/userSlice";
import LeftNav from "../LeftNav";
import FollowHandler from "./FollowHandler";
import UploadImage from "./UploadImage";
import { dateParser } from "../../util";

function UpdateProfil() {
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const userBio = useSelector((state) => state.user.bio);
  const { users } = useSelector((state) => state.user);
  const handleUpdate = () => {
    if (userData) dispatch(updateBio({ id: userData._id, bio }));
    setUpdateForm(false);
  };
  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profile Of {userData && userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Profile Photo</h3>
          <img src={userData && userData.picture} alt="user-pic" />
          <UploadImage />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  {userBio || (userData && userData.bio)}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Update Bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userBio || (userData && userData.bio)}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Commit Changes</button>
              </>
            )}
          </div>
          <h4>Member Since: {userData && dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Following: {userData && userData.following.length}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Followers: {userData && userData.followers.length}
          </h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Following</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {userData &&
                users &&
                users.map((item) => {
                  for (let i = 0; i < userData.following.length; i++) {
                    if (item._id === userData.following[i]) {
                      return (
                        <li key={item._id}>
                          <img src={item.picture} alt="user-pic" />
                          <h4>{item.pseudo}</h4>
                          <div className="follow-handler">
                            <FollowHandler
                              idToFollow={item._id}
                              type={"suggestion"}
                            />
                          </div>
                        </li>
                      );
                    }
                  }
                })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Followers</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {userData &&
                users &&
                users.map((item) => {
                  for (let i = 0; i < userData.followers.length; i++) {
                    if (item._id === userData.followers[i]) {
                      return (
                        <li key={item._id}>
                          <img src={item.picture} alt="user-pic" />
                          <h4>{item.pseudo}</h4>
                          <div className="follow-handler">
                            <FollowHandler
                              idToFollow={item._id}
                              type={"suggestion"}
                            />
                          </div>
                        </li>
                      );
                    }
                  }
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProfil;
