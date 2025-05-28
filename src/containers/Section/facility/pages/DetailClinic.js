import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Schedules from "../../doctor/pages/Schedules";
import ProfileDoctor from "../../doctor/pages/ProfileDoctor";
import { ApiGetClinicById } from "../../../../service/otherUserService";
import bgImage from "../../../../assets/image/bacsi.jpg";

const DetailClinic = () => {
  const { id } = useParams();
  const [dataDetailClinic, setDataDetailClinic] = useState({});
  const [dataDoctorId, setDataDoctorId] = useState([]);

  const navigate = useNavigate();
  const introRef = useRef(null);
  const doctorRef = useRef(null);

  useEffect(() => {
    fetchClinic();
  }, [id]);

  const fetchClinic = async () => {
    try {
      const res = await ApiGetClinicById(id);
      if (res.EC === 0) {
        setDataDetailClinic(res.DT);
        setDataDoctorId(res.DT.doctorClinics || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetailDoctor = (item) => {
    navigate(`/system/doctor-detail/${item}`);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-gray-200 min-h-screen">
      {/* Banner */}
      <div
        className="w-full h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-200 to-transparent"></div>
        <div className="h-full flex flex-col justify-end relative z-10">
          <div className="bg-white shadow-lg p-6 max-w-6xl mx-auto w-full rounded-t-xl">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-blue-200 shadow-md transform transition-transform hover:scale-105">
                <img
                  src={dataDetailClinic?.image}
                  alt={dataDetailClinic?.name || "Clinic"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-lato font-semibold text-blue-600">
                  {dataDetailClinic?.name}
                </h2>
                <p className="text-base font-lato text-gray-700">
                  {dataDetailClinic?.address}
                </p>
              </div>
            </div>

            {/* Nút điều hướng cuộn */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => scrollToSection(introRef)}
                className=" text-gray-400 px-6 py-2 rounded-lg font-lato font-medium"
              >
                Giới Thiệu
              </button>
              <button
                onClick={() => scrollToSection(doctorRef)}
                className=" text-gray-400 px-6 py-2 rounded-lg font-lato font-medium"
              >
                Bác Sĩ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Giới thiệu */}
      <div
        ref={introRef}
        className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      >
        <h3 className="text-xl sm:text-2xl font-lato font-semibold text-blue-600 mb-4">
          Giới Thiệu Cơ Sở
        </h3>
        {dataDetailClinic?.descriptionHTML && (
          <div
            className="bg-white shadow-lg rounded-xl p-6 text-base font-lato text-gray-700"
            dangerouslySetInnerHTML={{
              __html: dataDetailClinic.descriptionHTML,
            }}
          />
        )}
      </div>

      {/* Danh sách bác sĩ */}
      <div
        ref={doctorRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <h3 className="text-xl sm:text-2xl font-lato font-semibold text-blue-600 mb-6">
          Đội Ngũ Bác Sĩ
        </h3>
        {dataDoctorId && dataDoctorId.length > 0 ? (
          dataDoctorId.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-6 bg-white shadow-lg rounded-xl mb-6 p-6 transition-all hover:shadow-xl"
            >
              <div className="lg:w-1/2 w-full flex items-center justify-center lg:justify-start">
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <ProfileDoctor doctorId={item.doctorId} />
                  </div>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-lato font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => handleDetailDoctor(item.doctorId)}
                  >
                    Xem thêm
                  </button>
                </div>
              </div>

              <div className="lg:w-1/2 w-full flex justify-center">
                <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-md p-6">
                  <Schedules doctorId={item.doctorId} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 font-lato py-8">
            Không có bác sĩ nào trong cơ sở này.
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailClinic;
