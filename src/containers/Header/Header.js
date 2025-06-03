import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/image/logo.png";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FormattedMessage } from "react-intl";
import Language from "../../features/Language/pages/Language";
import UserInfo from "../../features/Info/pages/UserInfo";
import SideBar from "../../component/shared/SideBar";
import ParentComponent from "../../component/shared/ParentComponent";

const Header = () => {
  const account = useSelector((state) => state.auth.account);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <>
      <div className="flex items-center justify-between bg-gradient-to-r from-red-300 via-blue-300 to-green-300 p-2 shadow-lg w-full">
        <div className="flex items-center justify-between space-x-6 h-12 sm:h-8 px-2">
          <div className="flex items-center">
            <div
              onClick={toggleSidebar}
              className="flex items-center cursor-pointer p-2"
            >
              <FaBars size={25} />
            </div>
          </div>

          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 md:h-12 w-auto" />
            <span className="text-lg md:text-xl ml-1 sm:ml-2 font-fantasy bg-gradient-to-r from-pink-500 via-yellow-700 to-blue-800 bg-clip-text text-transparent">
              Sunday4
            </span>
          </NavLink>

          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/system/all-specialties"
              className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full"
            >
              <FormattedMessage id="navBar.specialty" />
            </NavLink>
            <NavLink
              to="/system/all-clinics"
              className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full"
            >
              <FormattedMessage id="navBar.facility" />
            </NavLink>
            <NavLink
              to="/system/all-doctors"
              className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full"
            >
              <FormattedMessage id="navBar.doctor" />
            </NavLink>
            <NavLink
              to="/system/all-blogs"
              className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full"
            >
              <FormattedMessage id="navBar.blog" />
            </NavLink>
          </div>
        </div>

        {isAuthenticated === false ? (
          <div className="flex items-center space-x-2 md:space-x-4">
            <Language className="text-sm md:text-base" />
            <ParentComponent className="hidden sm:block text-sm md:text-base" />
            <NavLink
              to="/register"
              className="flex items-center text-sm md:text-lg bg-gray hover:text-gray-900 font-mono text-gray-600 py-1 md:py-2"
            >
              <div className="flex items-center mr-1">
                <FaRegUser className="text-base md:text-xl" />
              </div>
              <span className="hidden sm:inline">
                <FormattedMessage id="navBar.guest" />
              </span>
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center space-x-2 md:space-x-4">
            <Language className="text-sm md:text-base" />
            <ParentComponent className="hidden md:block text-sm md:text-base" />
            <UserInfo />
          </div>
        )}
      </div>

      {/* Đặt SideBar ngoài div header để không bị giới hạn bởi header */}
      <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
