import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../../redux/features/language/languageSlice";
import vietnamFlag from "../../../assets/image/vietnam.png";
import ukFlag from "../../../assets/image/uk.png";

const Language = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.locale); // Sửa lại để lấy `locale`

  const handleLanguageChange = () => {
    dispatch(setLanguage(currentLang === "vi" ? "en" : "vi"));
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        {/* Button hiển thị cờ hiện tại */}
        <MenuButton className="flex items-center mx-2">
          <img
            src={currentLang === "vi" ? vietnamFlag : ukFlag}
            alt="Current Language"
            className="w-5 h-5 rounded-full"
          />
        </MenuButton>

        {/* Dropdown hiển thị cờ còn lại */}
        <MenuItems className="absolute left-0 w-10 rounded-md z-50">
          <MenuItem>
            <button
              onClick={handleLanguageChange}
              className="block p-2 items-center justify-center"
            >
              <img
                src={currentLang === "vi" ? ukFlag : vietnamFlag}
                alt="Switch Language"
                className="w-5 h-5 rounded-full"
              />
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
};

export default Language;
