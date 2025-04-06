import React from "react";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../redux/features/authSlide/authSlide";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";

const LogOutNavbar = () => {
  const { account } = useSelector((state) => state.auth);

  console.log("account login", account);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(handleLogout());
  };
  return (
    <>
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-yellow-300 font-mono">
            Welcome {account && account.username ? account.username : ""}!
          </p>
        </div>
        <div className="flex items-center" onClick={handleLogOut}>
          <IoIosLogOut className="text-white text-lg mr-1" />
          <span className="text-white cursor-pointer font-lato">Logout</span>
        </div>
      </div>
    </>
  );
};

export default LogOutNavbar;
