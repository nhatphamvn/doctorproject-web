import { NavLink } from "react-router-dom";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FormattedMessage } from "react-intl";


const HelpLink = () => {


  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center text-lg bg-gray hover:text-gray-900 font-fantasy text-gray-600 mx-4 py-2">
        <IoIosHelpCircleOutline/>
        <FormattedMessage id="navBar.help"/>
        <IoMdArrowDropdown/>
      </MenuButton>

      {/* Nội dung Dropdown */}
      <MenuItems className="absolute left-10 w-15 text-white shadow-md border border-gray-200 z-50">
        <MenuItem>
          <NavLink className="block px-4 bg-gray-500 py-2 data-[focus]:bg-gray-400">
            Liên Hệ
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink className="block px-4 bg-gray-700 py-2 data-[focus]:bg-gray-400">
            Changes
          </NavLink>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default HelpLink;
