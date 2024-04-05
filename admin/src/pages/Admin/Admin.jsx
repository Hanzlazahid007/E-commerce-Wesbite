import React from "react";
import "./Admin.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/listproduct" element={<ListProduct />}></Route>
        <Route path="/addproduct" element={<AddProduct />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
