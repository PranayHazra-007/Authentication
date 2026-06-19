import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const reduxUser = useSelector((state) => state.cart.user);
  const localUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUser = reduxUser || localUser;

  return currentUser ? (children) : (<Navigate to="/login" replace />);
};

export default PrivateRoute;