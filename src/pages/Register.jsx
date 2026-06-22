import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (!user.username || !user.email || !user.password) {
      return toast.error("Please fill all fields");
    }
    if (!user.email.endsWith("@gmail.com")) {
      return toast.error("Only Gmail accounts allowed");
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (u) => u.email === user.email
    );

    if (exists) {
      return toast.error("Email already registered");
    }

    users.push(user);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    toast.success("Registration Successful");

    navigate("/login");
  };

  return (
    <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">

      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "400px" }}
      >

        <h2 className="text-center text-primary fw-bold mb-4">
          Register
        </h2>

        <div className="mb-3">
          <label className="form-label">
            Username
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-decoration-none fw-bold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;

