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
if (
!user.username ||
!user.email ||
!user.password
) {
return toast.error(
"Please fill all fields"
);
}


if (
  !user.email.endsWith("@gmail.com")
) {
  return toast.error(
    "Only Gmail accounts allowed"
  );
}

const users =
  JSON.parse(
    localStorage.getItem("users")
  ) || [];

const exists = users.find(
  (u) => u.email === user.email
);

if (exists) {
  return toast.error(
    "Email already registered"
  );
}

users.push(user);

localStorage.setItem(
  "users",
  JSON.stringify(users)
);

toast.success(
  "Registration Successful"
);

navigate("/login");


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
width: "450px",
borderRadius: "20px",
}}
> <div className="text-center mb-4">


      <h1
        className="fw-bold"
        style={{
          fontSize: "2rem",
        }}
      >
        Create Account 🚀
      </h1>

      <p className="text-muted">
        Join the platform and get started
      </p>

    </div>

    <div className="mb-3">

      <label className="form-label fw-semibold">
        Username
      </label>

      <input
        type="text"
        className="form-control py-2"
        placeholder="Enter Username"
        name="username"
        value={user.username}
        onChange={handleChange}
      />

    </div>

    <div className="mb-3">

      <label className="form-label fw-semibold">
        Gmail Address
      </label>

      <input
        type="email"
        className="form-control py-2"
        placeholder="example@gmail.com"
        name="email"
        value={user.email}
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
        value={user.password}
        onChange={handleChange}
      />

    </div>

    <button
      className="btn btn-primary w-100 py-2 fw-semibold"
      onClick={handleRegister}
    >
      Create Account
    </button>

    <hr />

    <p className="text-center mb-0">
      Already have an account?{" "}
      <Link
        to="/login"
        className="fw-bold"
      >
        Login
      </Link>
    </p>

  </div>
</div>


);
};

export default Register;
