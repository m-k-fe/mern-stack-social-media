import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function Log({ register, login }) {
  const [registerModal, setRegisterModal] = useState(register);
  const [loginModal, setLoginModal] = useState(login);
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setRegisterModal(true);
      setLoginModal(false);
    } else if (e.target.id === "login") {
      setRegisterModal(false);
      setLoginModal(true);
    }
  };
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={registerModal ? "active-btn" : ""}
          >
            Register
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={loginModal ? "active-btn" : ""}
          >
            Login
          </li>
        </ul>
        {registerModal && <SignUpForm />}
        {loginModal && <SignInForm />}
      </div>
    </div>
  );
}

export default Log;
