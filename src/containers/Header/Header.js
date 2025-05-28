import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/image/logo.png";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import Help from "../../features/Language/pages/HelpLink";
import { FormattedMessage } from "react-intl";
import Language from "../../features/Language/pages/Language";
import UserInfo from "../../features/Info/pages/UserInfo";

const Header = () => {
  const account = useSelector((state) => state.auth.account);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 p-4 shadow-lg w-full">
        <div className="flex items-center justify-between space-x-6 h-12 sm:h-8 px-2">
          <div className="flex items-center cursor-pointer">
            <FaBars size={25} />
          </div>

          <NavLink to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-8 md:h-12 w-auto" // mobile: cao 8, desktop: cao 12
            />
            <span className="text-lg md:text-xl ml-1 sm:ml-2 font-fantasy text-gray-500">
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
            <Help className="hidden sm:block text-sm md:text-base" />
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
            <Help className="hidden md:block text-sm md:text-base" />
            <UserInfo />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
