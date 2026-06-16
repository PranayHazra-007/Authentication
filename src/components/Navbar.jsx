import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const Navbar = () => {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};


  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark px-4">

      <h4 className="navbar-brand mb-0">
        Profile App
      </h4>

      <div className="ms-auto d-flex align-items-center">

        <span className="text-white me-3">
          Welcome, {currentUser.username}
        </span>

        <button
          className="btn btn-primary me-2"
          onClick={() => {
            if (!currentUser) {
              navigate(`/login`);
            }else{
              toast.error("Please log in to access your profile.");
              navigate("/login")}
          }}
        >
          My Profile
        </button>
        <Link to="/cart" className="btn btn-primary ms-3">Cart</Link>
        <button
          className="btn btn-danger ms-3"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;

