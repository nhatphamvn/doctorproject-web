import React from "react";
import { FormattedMessage } from "react-intl";

const About = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center mt-8 my-5">
        <div className="w-full max-w-6xl flex items-center justify-start mb-8">
          <h1 className="text-2xl font-mono text-gray-800 whitespace-nowrap">
            <FormattedMessage id="homePage.topNews" />
          </h1>
        </div>
        <div className="w-full max-w-6xl flex justify-between items-center mb-8">
          <div className="border-2 border-gray-300 rounded-lg p-2">
            <iframe
              width="480"
              height="270"
              src="https://www.youtube.com/embed/NVNJFVDuSm4"
              title="Bệnh Viện Đà Nẵng Lần Đầu Tiên Thực Hiện Thành Công Ca Ghép Tế Bào Gốc Tự Thân I SKĐS"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className="w-full mx-8">
            <h1 className="text-2xl font-thin">
              <FormattedMessage id="homePage.proverb" />
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
