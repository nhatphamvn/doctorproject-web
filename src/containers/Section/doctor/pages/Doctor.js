import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import bgImage from "../../../../assets/image/facility/140311-background5.png";
import { fetchDoctors } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const Doctor = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.language.locale);
  const navigate = useNavigate();

  const doctors = useSelector((state) => state.doctors?.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

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
          <FormattedMessage id="homePage.outstandingDoctor" />
        </div>
        {/* Button bên phải trên */}
        <button className="absolute top-4 right-14 bg-gray-500 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-600 font-mono z-10">
          <FormattedMessage id="homePage.seeMore" />
        </button>

        {doctors && doctors.length > 0 ? (
          doctors.map((item) => {
            // Khai báo biến ngoài JSX
            let imagebase64 = "";
            if (item.image) {
              imagebase64 = atob(item.image);
            }
            let nameVi = `${item.positionData?.valueVi} - ${item.username}`;
            let nameEn = `${item.positionData?.valueEn} - ${item.username}`;

            return (
              <SwiperSlide
                key={item.id}
                className="flex flex-col items-center justify-center"
                onClick={() => navigate(`/system/doctor-detail/${item.id}`)}
              >
                <div className="w-48 h-48 rounded-full border-gray-400 overflow-hidden">
                  <img
                    src={imagebase64}
                    // alt={item.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-center text-black mt-2 font-lato">
                  {locale === "vi" ? nameVi : nameEn}
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

export default Doctor;
