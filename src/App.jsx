import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import MyProfile from "./pages/MyProfile";
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const PrivateRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return currentUser ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/home"
  element={
    <PrivateRoute>
      <HomePage />
    </PrivateRoute>
  }
>
  <Route path="profile" element={<MyProfile />} />
</Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

