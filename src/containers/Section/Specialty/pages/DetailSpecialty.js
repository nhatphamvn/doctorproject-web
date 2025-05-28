import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Schedules from "../../doctor/pages/Schedules";
import ProfileDoctor from "../../doctor/pages/ProfileDoctor";
import { ApiGetSpecialtyById } from "../../../../service/otherUserService";
import { fetchProvince } from "../../../../features/UserManagement/redux/allCodeSlides/actions/allcodeActions";

const DetailSpecialty = () => {
  const { id } = useParams();
  const [dataDetailSpecialty, setDataDetailSpecialty] = useState({});
  const [provinces, setProvince] = useState("ALL");
  const [dataDoctorId, setDataDoctorId] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { province: provinceData } = useSelector((state) => state.allcode);

  useEffect(() => {
    dispatch(fetchProvince());
  }, [dispatch]);

  useEffect(() => {
    if (provinceData && provinceData.length > 0) {
      const fullList = [
        {
          id: "ALL",
          key: "ALL",
          type: "PROVINCE",
          valueEn: "ALL",
          valueVi: "Toàn Quốc",
        },
        ...provinceData,
      ];
      setListProvince(fullList);
    }
  }, [provinceData]);

  useEffect(() => {
    fetchSpecialtyByProvince();
  }, [provinces, id]);

  const fetchSpecialtyByProvince = async () => {
    try {
      const res = await ApiGetSpecialtyById(id, provinces || "ALL");
      if (res.EC === 0) {
        setDataDetailSpecialty(res.DT);
        setDataDoctorId(res.DT.doctorSpecialty || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetailDoctor = (item) => {
    navigate(`/system/doctor-detail/${item}`);
    console.log("item", item);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-lato font-semibold text-blue-600 mb-4">
          {dataDetailSpecialty?.name || "Chuyên khoa"}
        </h2>
        <div className="text-base font-lato text-gray-700">
          {dataDetailSpecialty?.textHTML && (
            <div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-full" : "max-h-40"
                }`}
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.textHTML,
                }}
              />
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 mt-2 font-lato font-medium underline hover:text-blue-800 transition-colors"
              >
                {isExpanded ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Province Filter */}
      <div className="py-4 max-w-6xl mx-auto">
        <label className="text-sm font-lato text-gray-700 mb-2 block">
          Chọn khu vực:
        </label>
        <select
          value={provinces}
          onChange={(e) => setProvince(e.target.value)}
          className="p-2 border-2 border-blue-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          {listProvince.map((item) => (
            <option key={item.id} value={item.key}>
              {item.valueVi}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor List */}
      <div className="max-w-6xl mx-auto">
        {dataDoctorId && dataDoctorId.length > 0 ? (
          dataDoctorId.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-6 bg-white shadow-lg rounded-xl mb-6 p-6 transition-all hover:shadow-xl"
            >
              <div className="lg:w-1/2 w-full flex items-center justify-center lg:justify-start">
                <div className="flex flex-col items-center gap-4">
                  <div className="">
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
            Không có bác sĩ nào trong chuyên khoa này.
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailSpecialty;
