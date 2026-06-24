import React from "react";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import MyProfile from "./pages/MyProfile";
import ManageProduct from "./pages/ManageProduct";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
import Chat from "./pages/Chat";
import KanbanBoard from "./pages/KanbanBoard";
import Calendar from "./pages/Calendar";
import ProfileCompletionRoute from "./components/ProfileCompletionRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
     
        <Route path="/" element={<HomePage />}/>

        <Route path="/details/:id" element={<ProductDetails />}/>

        <Route path="/cart" element={<Cart />}/>
        <Route path="/calendar" element={<Calendar />}/>

        <Route path="/profile" element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>}/>
        <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>}/>
        <Route path="/manage-product" element={
            <PrivateRoute>
              <ManageProduct />
            </PrivateRoute>}/>
        <Route path="/chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>}/>   
        <Route path="/kanban" element={
            <ProfileCompletionRoute>
              <KanbanBoard />
            </ProfileCompletionRoute>}/>


        {/* Invalid Route */}
        <Route path="*" element={<Navigate to="/" />}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;