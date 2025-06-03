import React from "react";
import { NavLink } from "react-router-dom";
import image from "../../assets/image/banner-spe.png";
import { IoIosSearch } from "react-icons/io";
import { FormattedMessage, useIntl } from "react-intl";
import Specialty from "../Section/Specialty/pages/Specialty";
import Facility from "../Section/facility/pages/Facility";
import Doctor from "../Section/doctor/pages/Doctor";
import Blogs from "../Section/blogs/pages/Blogs";
import About from "../Section/about/pages/About";
import Footer from "../Footer/pages/Footer";
import ChatBot from "../Chatbot/page/ChatBot";

const HomePage = () => {
  const intl = useIntl();

  return (
    <>
      <div className="relative w-full">
        {/* Banner image */}
        <div className="relative w-full max-h-[550px] z-0">
          <img
            src={image}
            alt="Banner"
            className="w-full max-h-[550px] object-cover object-center md:object-top"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 pt-10 md:pt-12">
          <h1
            className="text-xl md:text-2xl font-mono text-center py-2"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
          >
            <FormattedMessage id="homePage.title" />
          </h1>

          {/* Search bar */}
          <div className="bg-gray-50 p-2 rounded-full flex items-center w-full max-w-xs sm:max-w-md md:max-w-lg shadow-lg mt-6">
            <div className="flex items-center text-black mx-2">
              <IoIosSearch size={22} />
            </div>
            <input
              type="text"
              placeholder={intl.formatMessage({ id: "homePage.search" })}
              className="w-full p-2 text-gray-700 border-none focus:outline-none font-lato bg-gray-50 text-sm md:text-base"
            />
          </div>

          {/* Gradient bottom (dùng để làm hiệu ứng fade xuống trắng) */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-white/100 pointer-events-none"></div>
        </div>
      </div>

      {/* Các Section phía dưới */}
      <div className="h-auto w-full">
        <Specialty />
        <Facility />
        <Doctor />
        <Blogs />
        <About />
        <Footer />
      </div>

      <div>
        <ChatBot />
      </div>
    </>
  );
};

export default HomePage;
