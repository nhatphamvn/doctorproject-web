import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpecialties } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { useNavigate } from "react-router-dom";

const Specialty = () => {
  const { specialties } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchSpecialties());
  }, [dispatch]);

  const handleDetailSpecialty = (item) => {
    navigate(`/system/specialty-detail/${item.id}`);
  };

  console.log("check special", specialties);
  return (
    <div className="w-full flex flex-col items-center mt-8">
      {/* Thanh tiêu đề và nút xem thêm */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h4 className="text-2xl font-mono text-gray-800">
          <FormattedMessage id="homePage.featuredSpecialties" />
        </h4>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-600 font-mono">
          <FormattedMessage id="homePage.seeMore" />
        </button>
      </div>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        className="w-full max-w-6xl"
      >
        {specialties && specialties.length > 0 ? (
          specialties.map((item) => {
            // Khai báo biến ngoài JSX
            let imagebase64 = "";
            if (item.image) {
              imagebase64 = atob(item.image);
            }

            return (
              <SwiperSlide
                key={item.id}
                className="flex flex-col items-center justify-center"
              >
                <div
                  className="w-auto h-48 border-gray-100 rounded-md border-2 overflow-hidden"
                  onClick={() => handleDetailSpecialty(item)}
                >
                  <img
                    src={imagebase64}
                    // alt={item.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-center text-black mt-2 font-lato">
                  {item.name}
                </h3>
              </SwiperSlide>
            );
          })
        ) : (
          <div className="text-center text-gray-600">Không có bác sĩ nào</div>
        )}
      </Swiper>
    </div>
  );
};

export default Specialty;
