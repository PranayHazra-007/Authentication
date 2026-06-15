import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const ChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const SignupUser = () => {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        existingUsers.push(user);
      localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("User data saved successfully!");
    setUser({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Signup</h2>

        <div className="mb-3">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={user.username}
            onChange={ChangeUser}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            onChange={ChangeUser}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={user.password}
            onChange={ChangeUser}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={SignupUser}>
          Signup
        </button>
        <br/>
        <p>Already have an Account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Signup;