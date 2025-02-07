import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const account = useSelector((state) => state.auth.account);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log('account login' ,account);
  console.log('check account',isAuthenticated);
  

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 shadow-lg">
      <div className="flex space-x-4">
        <NavLink to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          Home
        </NavLink>
        <NavLink to="/user" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          User
        </NavLink>
        <NavLink to="/admin" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          Admin
        </NavLink>
      </div>

      {isAuthenticated === false ? (
        <div className="flex space-x-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div>
          <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            ProFile
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
