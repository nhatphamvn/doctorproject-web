import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import bgImage from "../../../../assets/image/pexels-pixabay-434337.jpg";
import { fetchDoctors } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { FormattedMessage } from "react-intl";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

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
      className="w-full mt-8 bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Tiêu đề + nút */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className=" text-white text-2xl font-mono">
          <FormattedMessage id="homePage.outstandingDoctor" />
        </div>
        <NavLink
          to="/system/all-doctors"
          className="bg-gray-400 text-white px-4 py-2  rounded-3xl shadow-md hover:bg-gray-500 font-lato"
        >
          <FormattedMessage id="homePage.seeMore" />
        </NavLink>
      </div>

      {/* Swiper */}
      <div className="w-full px-4 pb-6">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          slidesPerGroup={1}
          direction="horizontal"
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="!w-full"
        >
          {doctors && doctors.length > 0 ? (
            doctors.map((item) => {
              let nameVi = `${item.positionData?.valueVi} - ${item.username}`;
              let nameEn = `${item.positionData?.valueEn} - ${item.username}`;

              return (
                <SwiperSlide
                  key={item.id}
                  className="flex flex-col items-center justify-start pt-4"
                  onClick={() => navigate(`/system/doctor-detail/${item.id}`)}
                >
                  <div className="w-48 h-48 rounded-full overflow-hidden cursor-pointer shadow-md">
                    <img
                      src={item.image}
                      alt={item.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-center text-white mt-4 font-lato">
                    {locale === "vi" ? nameVi : nameEn}
                  </h3>
                </SwiperSlide>
              );
            })
          ) : (
            <SwiperSlide>
              <div className="text-center text-white">Không có bác sĩ nào</div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Doctor;
