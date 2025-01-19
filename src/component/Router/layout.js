import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import User from '../Home/User';
import Admin from '../Home/Admin';
import Login from '../Auth/Login'
import Register from '../Auth/Register';

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Layout;
