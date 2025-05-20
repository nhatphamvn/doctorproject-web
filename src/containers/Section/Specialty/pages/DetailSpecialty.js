import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Schedules from "../../doctor/pages/Schedules";
import { useSelector, useDispatch } from "react-redux";
import ProfileDoctor from "../../doctor/pages/ProfileDoctor";
import { ApiGetSpecialtyById } from "../../../../service/otherUserService";
import { fetchProvince } from "../../../../features/UserManagement/redux/allCodeSlides/actions/allcodeActions";
import { useNavigate } from "react-router-dom";
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

  const handleDetailDoctor = (item) => {
    navigate(`/system/doctor-detail/${item}`);
    console.log("item", item);
  };

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
  }, [provinces]);

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="text-lg w-2/3 font-sans">
          {dataDetailSpecialty?.textHTML && (
            <div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-full" : "max-h-40"
                }`}
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.textHTML,
                }}
              ></div>

              {/* Nút Xem thêm / Thu gọn */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 mt-2 underline"
              >
                {isExpanded ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Province Filter */}
      <div className="py-4">
        <select
          value={provinces}
          onChange={(e) => setProvince(e.target.value)}
          className="p-1 border-2 border-gray-500 rounded-md"
        >
          {listProvince.map((item) => (
            <option key={item.id} value={item.key}>
              {item.valueVi}
            </option>
          ))}
        </select>
      </div>

      {dataDoctorId && dataDoctorId.length > 0 ? (
        dataDoctorId.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-6 bg-white shadow-lg mb-6 items-center h-72"
          >
            <div className="lg:w-1/2 w-full">
              <div className="flex items-center flex-col p-6 ml-10">
                <div>
                  <ProfileDoctor doctorId={item.doctorId} />
                </div>
                <div
                  className="cursor-pointer border-2 p-1 rounded-lg"
                  onClick={() => handleDetailDoctor(item.doctorId)}
                >
                  Xem thêm
                </div>
              </div>
            </div>

            {/* Right - Schedules and AddressAndPrice */}
            <div className="lg:w-1/2 w-full flex flex-col gap-6">
              <div className="px-6 w-96 h-40">
                <Schedules doctorId={item.doctorId} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          Không có bác sĩ nào trong chuyên khoa này.
        </div>
      )}
    </div>
  );
};

export default DetailSpecialty;
