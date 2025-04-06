import React from "react";
import UserNavbar from "./UserNavbar";
import ClinicNavbar from "./ClinicNavbar";
import LogOutNavbar from "./LogOutNavbar";
import SpecialtyNavbar from "./SpecialtyNavbar";
import HandBookNavbar from "./HandBookNavbar";
import Language from "../../../features/Language/pages/Language";

const SystemNavbar = () => {
  return (
    <>
      <div className="flex item-center justify-between p-4 bg-gray-600">
        <div className="flex items-center space-x-4 ">
          <UserNavbar />
          <ClinicNavbar />
          <SpecialtyNavbar />
          <HandBookNavbar />
        </div>
        <div className="flex items-center space-x-2">
          <Language />
          <LogOutNavbar />
        </div>
      </div>
    </>
  );
};

export default SystemNavbar;
