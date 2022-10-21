import React from "react";
import { NavLink } from "react-router-dom";

function LeftNav() {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" activeClassName="active-left-nav">
            <img src="./images/icons/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink to="/trending" activeClassName="active-left-nav">
            <img src="./images/icons/rocket.svg" alt="rocket" />
          </NavLink>
          <br />
          <NavLink to="/profile" activeClassName="active-left-nav">
            <img src="./images/icons/user.svg" alt="user" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
