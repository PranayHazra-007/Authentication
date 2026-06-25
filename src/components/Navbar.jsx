import React from "react";
import {useNavigate,Link} from "react-router-dom";
import toast from "react-hot-toast";
import {useSelector,useDispatch} from "react-redux";
import { logoutUser } from "../redux/slices/cartSlice";
import { calculateProgress } from "./ProgressBar";

const Navbar = () => {
const navigate = useNavigate();
const dispatch = useDispatch();

const user = useSelector((state) => state.cart.user);
const cartItems = useSelector((state) => state.cart.cartItems);

const currentUser = user || JSON.parse(localStorage.getItem("currentUser"));

const logout = () => {
localStorage.removeItem("currentUser");
dispatch(logoutUser());
navigate("/");
};

const myProfile = () => {
if (!currentUser) {
toast.error("Please log in to access your profile.");
  navigate("/login");
} else {
  navigate("/profile");
}
};

return (
<nav
className="navbar navbar-expand-lg sticky-top"
style={{background:"rgba(15,23,42,0.95)",backdropFilter:"blur(10px)",boxShadow:"0 10px 30px rgba(0,0,0,.15)",padding:"14px 0"}}
> <div className="container">

    <Link to="/"
      className="navbar-brand fw-bold d-flex align-items-center gap-2"
      style={{color: "white",fontSize: "1.5rem",textDecoration: "none",}}>
      <span>Profile App  🚀</span>
    </Link>

    <div className="ms-auto d-flex align-items-center flex-wrap gap-2">

      <div className="d-flex align-items-center gap-2 me-2 px-3 py-2" style={{background:"rgba(255,255,255,.08)",borderRadius:"50px", }}>
        <div style={{width: "35px",height: "35px",borderRadius:"50%",background:"#2563eb",color: "white",display: "flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",}}>
          {currentUser?.username?.charAt(0)?.toUpperCase() ||"G"}
        </div>

        <span className="fw-semibold" style={{color: "white"}}>
          {currentUser?.username ||"Guest"}
        </span>
      </div>

      {
        currentUser && 
        <button className="btn btn-outline-light" style={{borderRadius:"12px"}}
        onClick={myProfile}>
        Profile
        </button>
      }

      {currentUser && (
        <Link to="/manage-product" className="btn btn-success"style={{borderRadius:"12px"}}>
          Products
        </Link>
      )}

      {currentUser && (
       <Link to="/kanban" className="btn btn-warning fw-semibold" style={{borderRadius: "12px",}}>
        Kanban
       </Link>
      )}

      <Link to="/calendar" className="btn btn-outline-light">Calendar</Link>

      {currentUser && (
        <Link to="/chat" className="btn btn-info text-white fw-semibold"style={{borderRadius:"12px"}}>
          Chat
        </Link>
      )}

      <Link to="/cart" className="btn btn-primary position-relative fw-semibold" style={{borderRadius:"12px"}}>
        🛒
        {cartItems.length >0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartItems.length}
          </span>
        )}
      </Link>

      {currentUser ? (
        <button className="btn btn-danger fw-semibold" style={{borderRadius:"12px"}}onClick={logout}>
          Logout
        </button>
      ) : (
        <button className="btn btn-primary fw-semibold" style={{borderRadius:"12px"}}
          onClick={() =>navigate("/login")}>
          Login
        </button>
      )}
    </div>
  </div>
</nav>
);
};

export default Navbar;