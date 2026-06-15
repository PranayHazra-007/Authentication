import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const nav=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value}));
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );
    if (matchedUser) {
      alert(`Welcome ${matchedUser.username}!`);    
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      nav("/manage-profile");
      setLoginData({email: "",password: "" });
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email" value={loginData.email} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <input type="password" name="password" className="form-control" placeholder="Password" value={loginData.password} onChange={handleChange} />
        </div>
        <button className="btn btn-success w-100" onClick={handleLogin} >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;