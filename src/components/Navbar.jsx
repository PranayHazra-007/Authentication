import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.cart.user);
  const cartItems=useSelector((state) => state.cart.cartItems);
  const currentUser=user || JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch(logoutUser());
    navigate("/");
  };
  const myProfile=() => {
            if (!currentUser) {
              toast.error("Please log in to access your profile.");
              navigate(`/login`);
            }else{
              
              navigate("/profile")}
          }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark px-4">

      <h4 className="navbar-brand mb-0">
        Profile App
      </h4>

      <div className="ms-auto d-flex align-items-center">

        <span className="text-white me-3">
          Welcome, {currentUser?.username || "Guest"}
        </span>

        <button
          className="btn btn-primary me-2"
          onClick={myProfile}
        >
          My Profile
        </button>
        {currentUser && (
       <Link to="/manage-product" className="btn btn-success ms-3">
           Manage Product
        </Link>
        
         )}
         <Link to="/kanban" className="btn btn-info ms-3">Kanban</Link>
         
        <Link to="/cart" className="btn btn-primary ms-3">Cart{cartItems.length > 0 && ` (${cartItems.length})`}</Link>
        <Link to="/chat"className="btn btn-info ms-3">Chat</Link>
        {
          currentUser ?(<button
          className="btn btn-danger ms-3"
          onClick={logout}
        >
          Logout
        </button>):(
          <button
          className="btn btn-primary ms-3"
          onClick={()=>navigate("/login")}
        >
          Login
        </button>
        )
        }

      </div>

    </nav>
  );
};

export default Navbar;

