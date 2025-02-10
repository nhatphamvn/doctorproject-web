import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import User from './component/Home/User';
import Admin from './component/Home/Admin';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import App from './App';
import PrivateRoutes from './Routes/PrivateRoutes';

const Layout = () => {
  return (
    <Routes>
      {/* Bọc App để Navbar luôn hiển thị */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        
        <Route element={<PrivateRoutes />}>
          <Route path="user" element={<User />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Layout;
