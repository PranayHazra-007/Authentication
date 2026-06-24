import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/cartSlice";

const Login = () => {
const navigate = useNavigate();
const dispatch = useDispatch();

const [login, setLogin] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
setLogin({
...login,
[e.target.name]: e.target.value,
});
};

const handleLogin = () => {
const users =
JSON.parse(localStorage.getItem("users")) || [];

const user = users.find(
  (u) =>
    u.email === login.email &&
    u.password === login.password
);

if (!user) {
  return toast.error(
    "Invalid Email or Password"
  );
}

localStorage.setItem(
  "currentUser",
  JSON.stringify(user)
);

dispatch(setUser(user));

toast.success("Login Successful");

navigate("/home");


};

return (
<div
className="d-flex justify-content-center align-items-center"
style={{
minHeight: "100vh",
background:
"linear-gradient(135deg,#eff6ff,#f8fafc)",
}}
>
<div
className="card border-0 shadow-lg p-4"
style={{
width: "420px",
borderRadius: "20px",
}}
> <div className="text-center mb-4">


      <h1
        className="fw-bold"
        style={{
          fontSize: "2rem",
        }}
      >
        Welcome Back 👋
      </h1>

      <p className="text-muted">
        Login to continue
      </p>

    </div>

    <div className="mb-3">

      <label className="form-label fw-semibold">
        Email
      </label>

      <input
        type="email"
        className="form-control py-2"
        placeholder="Enter Email"
        name="email"
        value={login.email}
        onChange={handleChange}
      />

    </div>

    <div className="mb-4">

      <label className="form-label fw-semibold">
        Password
      </label>

      <input
        type="password"
        className="form-control py-2"
        placeholder="Enter Password"
        name="password"
        value={login.password}
        onChange={handleChange}
      />

    </div>

    <button
      className="btn btn-primary w-100 py-2 fw-semibold"
      onClick={handleLogin}
    >
      Login
    </button>

    <hr />

    <p className="text-center mb-0">
      Don't have an account?{" "}
      <Link
        to="/register"
        className="fw-bold"
      >
        Register
      </Link>
    </p>

  </div>
</div>


);
};

export default Login;
