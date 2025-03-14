import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import imageConfiguration from "../untils/imageConfiguration";
import bgImage from "../../../../assets/image/facility/140311-background5.png"; // Import ảnh từ thư mục assets

const Doctor = () => {
  return (
    <div
      className="w-full flex flex-col items-center mt-8 h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={1}
        className="w-full max-w-full h-96"
      >
        {/* Title bên trái trên */}
        <div className="absolute top-4 left-14 text-gray-600 text-2xl font-mono z-10">
          Bác Sĩ Nổi Bật
        </div>
        {/* Button bên phải trên */}
        <button className="absolute top-4 right-14 bg-gray-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-600 font-mono z-10">
          Xem thêm
        </button>

        {imageConfiguration.map((item) => (
        <SwiperSlide key={item.id} className="flex flex-col items-center justify-center">
          <div className="w-48 h-48 rounded-full border-gray-400 overflow-hidden">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-center text-black mt-2 font-lato">{item.title}</h3>
        </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
};

export default Doctor;
