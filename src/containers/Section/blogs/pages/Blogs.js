import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlog } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { useNavigate } from "react-router-dom";
import "swiper/css"; // Thêm dòng này
import "swiper/css/navigation"; // Thêm dòng này

const Blogs = () => {
  const { blogs } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  const handleDetailBlog = (item) => {
    navigate(`/system/blog-detail/${item.id}`);
  };

  return (
    <div className="w-full mt-8 my-5">
      {/* Thanh tiêu đề và nút xem thêm */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 mx-auto">
        <h4 className="text-2xl font-mono text-gray-800">
          <FormattedMessage id="homePage.tipsGuides" />
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
        direction="horizontal"
        className="w-full max-w-6xl"
      >
        {blogs && blogs.length > 0 ? (
          blogs.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex flex-col items-center justify-center"
            >
              <div
                className="w-auto h-48 p-4 border-gray-50 border-2 overflow-hidden cursor-pointer"
                onClick={() => handleDetailBlog(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center text-black mt-2 font-lato">
                {item.title}
              </h3>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="text-center text-gray-600">
              Không có bài viết nào
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Blogs;
