import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import imageConfiguration from "../untils/imageConfiguration";

const Blogs = () => {
  return (
    <div className="w-full flex flex-col items-center mt-8 my-5">
      {/* Thanh tiêu đề và nút xem thêm */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h4 className="text-2xl font-mono text-gray-800">Cẩm Nang</h4>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-600 font-mono">
          Xem thêm
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        className="w-full max-w-6xl"
      >
        {imageConfiguration.map((item) => (
          <SwiperSlide key={item.id} className="bg-white p-6 shadow-lg rounded-lg border-2 border-gray-200">
            <img src={item.img} alt={item.title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-center mt-2 font-lato">{item.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Blogs
