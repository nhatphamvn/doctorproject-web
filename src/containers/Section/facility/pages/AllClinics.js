import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClinics } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../../assets/image/banner-spe.png";
import Footer from "../../../Footer/pages/Footer";

const AllClinics = () => {
  const { clinics } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchClinics());
  }, [dispatch]);

  const handleDetailClinic = (item) => {
    navigate(`/system/clinic-detail/${item.id}`);
  };

  console.log("check special", clinics);

  return (
    <>
      <div className="bg-blue-50 py-1">
        {/* Banner */}
        <div
          className="w-full h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Overlay gradient */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-50 to-transparent"></div>

          <div className="flex items-center h-full relative z-10">
            <div className="pl-8 md:pl-12 text-3xl md:text-4xl font-mono text-blue-400 drop-shadow-lg">
              Cở Sở Y Tế
            </div>
          </div>
        </div>

        {/* Grid danh sách chuyên khoa */}
        <div className="flex justify-center my-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full px-4">
            {clinics &&
              clinics.map((item) => (
                <div
                  key={item.id}
                  className="relative group border-2 border-gray-100 rounded-md overflow-hidden cursor-pointer transition hover:shadow-md w-full max-w-[280px] mx-auto"
                  onClick={() => handleDetailClinic(item)}
                >
                  {/* Image */}
                  <div className="w-full h-52">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-full bg-blue-900 bg-opacity-60 text-white p-3 flex flex-col justify-start transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-base font-lato">{item.name}</h3>
                    <p className="text-xs mt-1 line-clamp-3">{item.address}</p>
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

export default AllClinics;
