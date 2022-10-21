import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/authSlice";
import SignInForm from "./SignInForm";

function SignUpForm() {
  const dispatch = useDispatch();
  const [formSubmit, setFormSubmit] = useState(false);
  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const { registerError } = useSelector((state) => state.auth);
  const handleRegister = (e) => {
    e.preventDefault();
    const terms = document.querySelector("#terms");
    setPasswordError("");
    setTermsError("");
    if (user.password !== user.confirmPassword || !terms.checked) {
      if (user.password !== user.confirmPassword)
        setPasswordError("Passwords Do Not Match");
      if (!terms.checked)
        setTermsError("You Should Validate Terms And Conditions");
    } else {
      dispatch(registerUser({ user, setFormSubmit }));
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">Successful Register, Please Login</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setUser({ ...user, pseudo: e.target.value })}
            value={user.pseudo}
          />
          <br />
          {registerError && registerError.pseudo && (
            <div className="pseudo error">{registerError.pseudo}</div>
          )}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
          <br />
          {registerError && registerError.email && (
            <div className="email error">{registerError.email}</div>
          )}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
          <br />
          {registerError && registerError.password && (
            <div className="password error">{registerError.password}</div>
          )}
          <br />
          <label htmlFor="password-conf">Confirm Password</label>
          <br />
          <input
            type="password"
            name="password-conf"
            id="password-conf"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            value={user.confirmPassword}
          />
          <br />
          {passwordError && (
            <div className="password-conf error">{passwordError}</div>
          )}
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I accept the{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              terms and conditions
            </a>
          </label>
          <br />
          {termsError && <div className="terms error">{termsError}</div>}
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      )}
    </>
  );
}

export default SignUpForm;
