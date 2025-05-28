import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpecialties } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../../assets/image/banner-spe.png";
import Footer from "../../../Footer/pages/Footer";

const AllSpecialties = () => {
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
    <>
      <div>
        {/* Banner */}
        <div
          className="w-full h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Overlay gradient */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-50 to-transparent"></div>

          <div className="flex items-center h-full relative z-10">
            <div className="pl-8 md:pl-12 text-3xl md:text-4xl font-mono text-blue-400 drop-shadow-lg">
              Chuyên Khoa
            </div>
          </div>
        </div>

        {/* Grid danh sách chuyên khoa */}
        <div className="flex justify-center my-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
            {specialties &&
              specialties.map((item) => (
                <div
                  key={item.id}
                  className="relative group border-2 border-gray-100 rounded-md overflow-hidden cursor-pointer transition hover:shadow-md"
                  onClick={() => handleDetailSpecialty(item)}
                >
                  {/* Image */}
                  <div className="h-48 w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-full bg-blue-900 bg-opacity-60 text-white p-4 flex flex-col justify-start transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-lg font-lato">{item.name}</h3>
                    <p className="text-sm mt-1 line-clamp-3">
                      {item.description}
                    </p>
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

export default AllSpecialties;
