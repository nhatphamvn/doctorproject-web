import React from 'react';
import './Nav.scss'
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="topnav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/user">User</NavLink>
      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
}

export default Nav;
