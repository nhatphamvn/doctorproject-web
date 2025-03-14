import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../containers/Homepage/HomePage.js';
import User from '../features/UserManagement/pages/UserManagement.js';
import Admin from '../features/AdminManagement/pages/AdminManagement.js';
import Login from '../features/Auth/pages/LoginPage.js';
import Register from '../features/Auth/pages/RegisterPage.js';
import App from '../App.js';
import PrivateRoutes from '../routes/PrivateRoutes.js';

const AppRouter = () => {
  return (
    <Routes>
      {/* Bọc App để Navbar luôn hiển thị */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} /> {/* Đổi từ path="/home" thành index */}
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/system/user-all" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
