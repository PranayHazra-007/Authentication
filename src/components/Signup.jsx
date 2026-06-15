import React, { useState } from "react";

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
    localStorage.setItem("user", JSON.stringify(user));

    alert("User data saved successfully!");

    setUser({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Signup</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={ChangeUser}
      />

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={ChangeUser}
      />

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={ChangeUser}
      />

      <br />
      <br />

      <button onClick={SignupUser}>Signup</button>
    </div>
  );
};

export default Signup;