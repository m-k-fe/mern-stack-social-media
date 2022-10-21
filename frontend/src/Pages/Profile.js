import React from "react";
import { useSelector } from "react-redux";
import Log from "../Components/Auth/Index";
import UpdateProfil from "../Components/Profil/UpdateProfil";

function Profile() {
  const { uid } = useSelector((state) => state.auth);
  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log register={true} login={false} />
          <div className="img-container">
            <img src="./images/log.svg" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
