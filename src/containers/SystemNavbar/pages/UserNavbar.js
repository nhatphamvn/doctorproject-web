import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { NavLink } from "react-router-dom";
const UserNavbar = () => {
  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className=" flex items-center text-white text-lg font-lato">
            Người Dùng
          </MenuButton>
          <MenuItems className="absolute left-[-18px] mt-4 w-60 bg-white shadow-lg z-10">
            <MenuItem>
              <NavLink
                to="/system/user-all"
                className="block px-4 py-2 data-[focus]:bg-gray-200"
              >
                Quản Lí Người Dùng
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                to="/system/user-redux"
                className="block px-4 py-2 data-[focus]:bg-gray-200"
              >
                Quản Lí Người Redux
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                to="/system/markdown"
                className="block px-4 py-2 data-[focus]:bg-gray-200"
              >
                Manage Doctor
              </NavLink>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
};

export default UserNavbar;
