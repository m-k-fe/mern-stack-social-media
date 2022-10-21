import React from "react";
import axios from "axios";
import cookie from "js-cookie";

function Logout() {
  const handleLogout = async () => {
    await axios({
      method: "get",
      url: "http://localhost:5000/api/users/logout",
      withCredentials: true,
    })
      .then(() => cookie.remove("token", { expires: 1 }))
      .catch((err) => console.log(err));

    window.location = "/";
  };
  return (
    <li onClick={handleLogout}>
      <img src="./images/icons/logout.svg" alt="logout" />
    </li>
  );
}

export default Logout;
