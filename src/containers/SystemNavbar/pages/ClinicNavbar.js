import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { NavLink } from "react-router-dom";

const ClinicNavbar = () => {
  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className=" flex items-center text-white text-lg font-lato">
            Phòng Khám
          </MenuButton>
          <MenuItems className="absolute mt-4 w-60 bg-white shadow-lg rounded-md z-10">
            <MenuItem>
              <Menu as="div" className="relative">
                <MenuButton
                  as={NavLink}
                  className="block px-4 py-2 bg-white text-black border-solid shadow-sm rounded-sm font-lato"
                >
                  Quản Trị Hệ Thống
                </MenuButton>
                <MenuItems className="absolute left-full top-0 mt-0 w-64 bg-white shadow-lg rounded-md z-10">
                  <MenuItem>
                    <NavLink
                      to="/system/user-all"
                      className="block px-4 py-2 bg-gray-300 font-lato"
                    >
                      Quản Lí Người Dùng
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to="/admin"
                      className="block px-4 py-2 bg-gray-400 font-lato"
                    >
                      Quản Lí User Redux
                    </NavLink>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
};

export default ClinicNavbar;
