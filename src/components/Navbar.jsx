import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      <h4 className="navbar-brand mb-0">
        Profile App
      </h4>

      <div className="ms-auto d-flex align-items-center">

        <span className="text-white me-3">
          Welcome, {currentUser.username}
        </span>

        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/home/profile")}
        >
          My Profile
        </button>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;

