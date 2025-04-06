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

  console.log("account login", account);
  console.log("check account", isAuthenticated);

  return (
    <>
      <div className="flex items-center justify-between bg-gray-300 p-4 shadow-lg">
        <div className="flex items-center justify-between space-x-6">
          <div className="flex items-center cursor-pointer">
            <FaBars size={25} />
          </div>

          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <span className="text-xl ml-2 font-fantasy text-gray-500">
              Sunday4
            </span>
          </NavLink>

          <div className="flex space-x-4">
            <NavLink
              to="/system/user-all"
              className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full"
            >
              <FormattedMessage id="navBar.specialty" />
            </NavLink>
            <NavLink
              to="/#"
              className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full"
            >
              <FormattedMessage id="navBar.facility" />
            </NavLink>
            <NavLink
              to="/#"
              className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full"
            >
              <FormattedMessage id="navBar.doctor" />
            </NavLink>
            <NavLink
              to="/#"
              className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full"
            >
              <FormattedMessage id="navBar.test" />
            </NavLink>
          </div>
        </div>

        {isAuthenticated === false ? (
          <div className="flex items-center">
            <Language />
            <Help />

            <NavLink
              to="/register"
              className="flex items-center text-lg bg-gray hover:text-gray-900 font-mono text-gray-600  py-2"
            >
              <div className="flex items-center mx-1">
                <FaRegUser />
              </div>
              <FormattedMessage id="navBar.guest" />
            </NavLink>
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <div className="flex items-center">
                <Language />
              </div>
              <div>
                <Help />
              </div>
              <div>
                <UserInfo />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
