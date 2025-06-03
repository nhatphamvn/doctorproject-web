import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { fetchClinics } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { useNavigate } from "react-router-dom";
import "swiper/css"; // Thêm dòng này
import "swiper/css/navigation"; // Thêm dòng này

const Facility = () => {
  const { clinics } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchClinics());
  }, [dispatch]);

  const handleDetailClinic = (item) => {
    navigate(`/system/clinic-detail/${item.id}`);
  };

  return (
    <div className="w-full mt-8">
      {/* Thanh tiêu đề và nút xem thêm */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 mx-auto">
        <h4 className="text-2xl font-mono text-gray-800">
          <FormattedMessage id="homePage.featuredMedicalFacilities" />{" "}
          {/* Sửa ID để phù hợp hơn */}
        </h4>
        <button className="bg-gray-300 text-white px-4 py-2 rounded-3xl shadow-md hover:bg-gray-400 font-lato">
          <FormattedMessage id="homePage.seeMore" />
        </button>
      </div>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        direction="horizontal"
        className="w-full max-w-6xl"
      >
        {clinics && clinics.length > 0 ? (
          clinics.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex flex-col items-center justify-center"
            >
              <div
                className="w-auto h-48 p-4 border-gray-100 rounded-md border-2 overflow-hidden cursor-pointer"
                onClick={() => handleDetailClinic(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center text-black mt-2 font-lato">
                {item.name}
              </h3>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="text-center text-gray-600">Không có cơ sở nào</div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Facility;
