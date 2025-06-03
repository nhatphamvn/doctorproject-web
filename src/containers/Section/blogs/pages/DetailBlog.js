import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogById } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const DetailBlog = () => {
  const { id } = useParams();
  const { blog } = useSelector((state) => state.doctors);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [id]);

  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-300 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {blog ? (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <h4 className="text-3xl sm:text-2xl font-lato font-semibold text-gray-800 text-center mb-6">
              {blog.title}
            </h4>

            {/* Hình ảnh */}
            <div className="mb-8">
              <div className="w-auto h-96">
                <img
                  src={blog?.image}
                  alt={blog?.title || "Blog image"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Nội dung và thông tin tác giả */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thông tin tác giả (trái) */}
            <div className="lg:w-1/3 w-full flex flex-col p-6">
              <div className="flex items-center gap-2 text-sm font-lato text-gray-700 mb-2">
                <FaUser className="text-blue-600" />
                <span className="text-black">
                  Tác Giả: {blog?.userData?.username}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-lato text-gray-700">
                <FaCalendarAlt className="text-blue-600" />
                <span>Ngày: {blog.date}</span>
              </div>
            </div>

            {/* Nội dung bài viết (phải) */}
            <div className="lg:w-2/3 w-full p-6 text-base font-lato text-gray-700">
              {blog?.postHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.postHTML,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 font-lato py-8">
          Không có thông tin bài viết
        </div>
      )}
    </div>
  );
};

export default DetailBlog;
