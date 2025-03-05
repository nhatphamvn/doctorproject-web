import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../../assets/image/logo.png'
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const account = useSelector((state) => state.auth.account);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log('account login' ,account);
  console.log('check account',isAuthenticated);
  

  return (
    <div className="flex items-center justify-between bg-fffa p-4 shadow-lg">
        <div className="flex items-center justify-between space-x-6">
            <div className="flex items-center cursor-pointer">
                <FaBars size={25}/>
            </div>
    
            <NavLink to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-12 w-auto" />
                <span className="text-xl ml-2 font-fantasy text-gray-500">Sunday4</span>
            </NavLink>

            <div className="flex space-x-4">
                <NavLink to="/#" className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full">
                Chuyên Khoa
                </NavLink>
                <NavLink to="/#" className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full">
                Cơ Sở Y Tế
                </NavLink>
                <NavLink to="/#" className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full">
                Bác Sĩ
                </NavLink>
                <NavLink to="/#" className="text-lg text-gray-600 font-lato hover:bg-gray-400 px-3 py-2 rounded-full">
                Gói Khám
                </NavLink>
            </div>
        </div>


      {isAuthenticated === false ? (
        <div className="flex items-center">
           <NavLink to="/" className="flex items-center text-lg bg-gray hover:text-gray-900 font-fantasy text-gray-600 mx-4 py-2">
                <div className="flex items-center mx-1">
                    <IoIosHelpCircleOutline/>
                </div>
                Help
            </NavLink>
            
            <NavLink to="/register" className="flex items-center text-lg bg-gray hover:text-gray-900 font-fantasy text-gray-600  py-2">
                <div className="flex items-center mx-1">
                    <FaRegUser/>
                </div>
                Guest
            </NavLink>
    
        </div>
      ) : (
        <NavLink to="/" className="flex items-center text-lg bg-gray hover:text-gray-900 font-fantasy text-gray-600 mx-4 py-2">
                <div className="flex items-center mx-1">
                    <IoIosHelpCircleOutline/>
                </div>
                Help
        </NavLink>
      )}
    </div>
  );
};

export default Header;
