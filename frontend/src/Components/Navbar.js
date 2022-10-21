import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logout from "./Auth/Logout";
import { getUser } from "../redux/features/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (uid) dispatch(getUser(uid));
  }, [uid]);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./images/icon.png" alt="icon" />
              <h3>Raccoont</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profile">
                Welcome <span>{userData && userData.pseudo}</span>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profile">
                <img src="./images/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
