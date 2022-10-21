import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/authSlice";

function SignInForm() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const { loginError } = useSelector((state) => state.auth);
  const handleLogin = (e) => {
    e.preventDefault();
    if (user.email && user.password) dispatch(loginUser(user));
  };
  return (
    <form action="" onSubmit={handleLogin} id="register-form">
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
      {loginError && loginError.email && (
        <div className="email error">{loginError.email}</div>
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
      {loginError && loginError.password && (
        <div className="password error">{loginError.password}</div>
      )}
      <br />
      <input type="submit" value="Sign In" />
    </form>
  );
}

export default SignInForm;
