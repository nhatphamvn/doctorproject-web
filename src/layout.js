import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import User from './component/Home/User';
import Admin from './component/Home/Admin';
import Login from './component/Auth/Login'
import Register from './component/Auth/Register';
import App from './App';

const Layout = () => {
  return (
    <>
    <Routes>
      {/* Bọc Layout để Navbar luôn hiển thị */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="admin" element={<Admin />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Login và Register không cần Navbar */}
    </Routes>
    </>
  );
};

export default Layout;
