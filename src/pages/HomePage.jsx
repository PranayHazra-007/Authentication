import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


const HomePage = () => {


  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Outlet />
       
      </div>
      
    </>
  );
};

export default HomePage;

