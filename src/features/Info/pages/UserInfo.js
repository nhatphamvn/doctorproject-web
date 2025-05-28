import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { handleLogout } from "../../../redux/features/authSlide/authSlide";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(handleLogout());
  };
  const handleSystemPrivate = () => {
    navigate("/system/system-private");
  };
  return (
    <>
      <div className="">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="flex items-center text-3xl bg-gray hover:text-gray-900 mr-2 py-2">
            <FaRegUserCircle />
          </MenuButton>

          <MenuItems className="absolute right-1 mt-2 z-50 flex flex-col gap-2">
            <MenuItem>
              <NavLink
                className="flex items-center justify-center text-black w-10 h-10 bg-white rounded-full shadow-lg"
                onClick={handleLogOut}
              >
                <FiLogOut className="text-2xl" />
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                to={"/system/system-private"}
                className="flex items-center justify-center text-black w-10 h-10 bg-white rounded-full shadow-lg"
              >
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
