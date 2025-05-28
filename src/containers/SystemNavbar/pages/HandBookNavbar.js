import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { NavLink } from "react-router-dom";

const HandBookNavbar = () => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className=" flex items-center text-white text-lg font-lato">
          Bài Viết
        </MenuButton>
        <MenuItems className="absolute left-[-18px] mt-4 w-60 bg-white shadow-lg z-10">
          <MenuItem>
            <NavLink
              to="/doctor/create-blog"
              className="block px-4 py-2 data-[focus]:bg-gray-200"
            >
              Tạo Bài Viết
            </NavLink>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default HandBookNavbar;
