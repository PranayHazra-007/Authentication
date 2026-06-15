import React from "react";
import Signup from "./components/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./components/Login";

function App() {

return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)


}

export default App
