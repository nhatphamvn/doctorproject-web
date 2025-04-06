import React from "react";
import { NavLink } from "react-router-dom";
import image from "../../assets/image/bacsi.jpg";
import { IoIosSearch } from "react-icons/io";
import { FaHospital } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import { BsHospitalFill } from "react-icons/bs";
import { GiHypodermicTest } from "react-icons/gi";
import { RiMentalHealthLine } from "react-icons/ri";
import { PiTooth } from "react-icons/pi";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import Specialty from "../Section/Specialty/pages/Specialty";
import Facility from "../Section/facility/pages/Facility";
import Doctor from "../Section/doctor/pages/Doctor";
import Blogs from "../Section/blogs/pages/Blogs";
import About from "../Section/about/pages/About";
import Footer from "../Footer/pages/Footer";

const HomePage = () => {
  const intl = useIntl();

  return (
    <>
      <div className="relative w-full">
        {/* Hình nền */}
        <div className="relative w-full max-h-[550px] z-0">
          <img
            src={image}
            alt="Banner"
            className="w-full max-h-[550px] object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/ to-transparent"></div>
        </div>

        {/* Nội dung chồng lên */}
        <div className="absolute inset-0 flex flex-col items-center text-white pt-12">
          <h1
            className="text-2xl font-mono text-white py-4"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
          >
            <FormattedMessage id="homePage.title" />
            {/* Liều thuốc tốt nhất cho cơ thể là một tâm hồn tĩnh lặng */}
          </h1>

          {/* Thanh tìm kiếm */}
          <div className="bg-white p-2 rounded-full flex items-center w-3/4 max-w-md shadow-lg mt-6">
            <div className="flex items-center text-black mx-2">
              <IoIosSearch size={25} />
            </div>
            <input
              type="text"
              placeholder={intl.formatMessage({ id: "homePage.search" })}
              className="w-full p-2 text-gray-700 border-none focus:outline-none font-fantasy"
            />
          </div>

          {/* Navbar ngay dưới thanh search */}
          <div className="flex items-center justify-between pt-40">
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-b from-transparent to-white/100"></div>

            <div
              className="flex space-x-6 relative z-10"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
            >
              <NavLink to="/#" className="flex flex-col items-center">
                <FaHospital size={25} />
                <p className="text-md text-white font-mono hover:text-gray-300 px-3 py-2">
                  <FormattedMessage id="homePage.testSpecialty" />
                </p>
              </NavLink>

              <NavLink to="/#" className="flex flex-col items-center">
                <MdOutlineContactPhone size={25} />
                <p className="text-md text-white font-mono hover:text-gray-300 px-3 py-2">
                  <FormattedMessage id="homePage.testRemote" />
                </p>
              </NavLink>

              <NavLink to="/#" className="flex flex-col items-center">
                <BsHospitalFill size={25} />
                <p className="text-md text-white font-mono hover:text-gray-300 px-3 py-2">
                  <FormattedMessage id="homePage.testGeneral" />
                </p>
              </NavLink>
              <NavLink to="/" className="flex flex-col items-center">
                <GiHypodermicTest size={25} />
                <p className="text-md text-white font-mono hover:text-gray-300 px-3 py-2">
                  <FormattedMessage id="homePage.testMedical" />
                </p>
              </NavLink>
              <NavLink to="/#" className="flex flex-col items-center">
                <RiMentalHealthLine size={25} />
                <p className="text-md text-white font-mono hover:text-gray-300 px-3 py-2">
                  <FormattedMessage id="homePage.testMental" />
                </p>
              </NavLink>
              <NavLink to="/#" className="flex flex-col items-center">
                <PiTooth size={25} />
                <p className="text-md text-white font-mono hover:text-gray-300 px-3 py-2">
                  <FormattedMessage id="homePage.testDentistry" />
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Specialty />
      <Facility />
      <Doctor />
      <Blogs />
      <About />
      <Footer />
    </>
  );
};

export default HomePage;
