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
      return toast.error("Invalid Email or Password");
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
    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div
        className="card shadow p-4"
        style={{ width: "350px" }}
      >

        <h2 className="text-center mb-4">
          Login
        </h2>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          value={login.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={login.password}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;

