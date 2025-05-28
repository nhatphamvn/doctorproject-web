import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../../redux/features/language/languageSlice";
import vietnamFlag from "../../../assets/image/vietnam.png";
import ukFlag from "../../../assets/image/uk.png";

const Language = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.locale);

  const [isMobile, setIsMobile] = useState(false);

  // Theo dõi kích thước màn hình để xác định mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md: breakpoint mặc định của Tailwind
    };

    handleResize(); // Gọi khi mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLanguageChange = () => {
    dispatch(setLanguage(currentLang === "vi" ? "en" : "vi"));
  };

  return (
    <Menu as="div" className="relative inline-block text-left md:ml-12">
      {/* Nút hiển thị ngôn ngữ hiện tại */}
      <MenuButton className="flex items-center mx-2">
        <img
          src={currentLang === "vi" ? vietnamFlag : ukFlag}
          alt="Current Language"
          className="w-5 h-5 rounded-full"
        />
      </MenuButton>

      {/* Dropdown chỉ hiển thị trên thiết bị không phải mobile */}
      {!isMobile && (
        <MenuItems className="absolute left-0 w-10 z-50">
          <MenuItem>
            <button
              onClick={handleLanguageChange}
              className="block p-2 w-full text-center"
            >
              <img
                src={currentLang === "vi" ? ukFlag : vietnamFlag}
                alt="Switch Language"
                className="w-5 h-5 rounded-full"
              />
            </button>
          </MenuItem>
        </MenuItems>
      )}
    </Menu>
  );
};

export default Language;
