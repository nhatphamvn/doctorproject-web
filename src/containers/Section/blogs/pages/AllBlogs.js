import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlog } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../../assets/image/pexels-pixabay-434337.jpg";
import Footer from "../../../Footer/pages/Footer";
import { FormattedMessage } from "react-intl";

const AllBlogs = () => {
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
    <>
      <div className="bg-gray-50 ">
        {/* Banner */}
        <div
          className="w-full h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Overlay gradient */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-yellow-50 to-transparent"></div>

          <div className="flex items-center h-full relative z-10">
            <h1 className="pl-8 md:pl-12 text-4xl font-mono text-blue-300 drop-shadow-lg">
              <FormattedMessage id="navBar.blog" />
            </h1>
          </div>
        </div>

        {/* Danh sách blog */}
        <div className="flex justify-center my-20 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl w-full px-4">
            {blogs &&
              blogs.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => handleDetailBlog(item)}
                >
                  {/* Image */}
                  <div className="h-56 w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <div className="mt-3 px-2">
                    <h3 className="text-lg font-lato text-gray-800 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default AllBlogs;
