import React from "react";
import { FormattedMessage } from "react-intl";

const About = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center mt-8 my-5 px-4">
        <div className="w-full max-w-6xl flex items-center justify-start mb-8">
          <h1 className="text-2xl font-lato text-gray-800 whitespace-nowrap">
            <FormattedMessage id="homePage.topNews" />
          </h1>
        </div>

        {/* Responsive Section */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          {/* Video */}
          <div className="w-full md:w-auto p-2">
            <div className="relative w-full md:w-[480px] md:h-[270px] aspect-video">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.youtube.com/embed/NVNJFVDuSm4"
                title="Bệnh Viện Đà Nẵng Lần Đầu Tiên Thực Hiện Thành Công Ca Ghép Tế Bào Gốc Tự Thân I SKĐS"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:flex-1 mx-2">
            <h1 className="text-2xl font-lato">
              <FormattedMessage id="homePage.proverb" />
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
