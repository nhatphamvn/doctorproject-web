import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { NavLink } from "react-router-dom";
const DoctorNavbar = () => {
  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className=" flex items-center text-white text-lg font-lato">
            Bác Sĩ
          </MenuButton>
          <MenuItems className="absolute left-[-18px] mt-4 w-60 bg-white shadow-lg z-10">
            <MenuItem>
              <NavLink
                to="doctor/check-list-patient"
                className="block px-4 py-2 data-[focus]:bg-gray-200"
              >
                Kiểm tra lịch khám
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                to="/doctor/medical-appointment"
                className="block px-4 py-2 data-[focus]:bg-gray-200"
              >
                Quản lí lịch khám bệnh
              </NavLink>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
};

export default DoctorNavbar;
