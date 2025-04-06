import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {handleLogout} from '../../../redux/features/authSlide/authSlide'
import { useDispatch } from 'react-redux';
const UserInfo = () => {

    const dispatch = useDispatch()

    const handleLogOut =()=>{
        dispatch(handleLogout())
    }
    return (
    <>
      <div className=''>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="flex items-center text-3xl bg-gray hover:text-gray-900 mr-2 py-2">
            <FaRegUserCircle />
          </MenuButton>
            <MenuItems className="absolute right-1 z-50 bg-white rounded-full w-10 h-10 shadow-lg flex items-center justify-center">
            <MenuItem>
                <NavLink className="flex items-center justify-center text-black w-full h-full" 
                
                onClick={handleLogOut}>
                    <FiLogOut className="text-2xl" />
                </NavLink>
            </MenuItem>
            </MenuItems>
        </Menu>
      </div>
    </>
  );
};

export default UserInfo;