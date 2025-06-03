import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCalendarDays } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { ApiGetDoctorSchedule } from "../../../../service/otherUserService";

const ProfileDoctor = ({ doctorId, data }) => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const locale = useSelector((state) => state.language.locale);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!doctorId) {
        console.warn("Missing doctorId");
        return;
      }

      try {
        const response = await ApiGetDoctorSchedule(doctorId);
        if (response?.DT) {
          setDoctorInfo(response.DT);
        } else {
          console.warn("No schedule data returned for doctorId:", doctorId);
        }
      } catch (error) {
        console.error("Error fetching doctor schedule:", error);
      }
    };

    fetchSchedule();
  }, [doctorId]);

  const priceVi = `${doctorInfo?.Doctor_Infor?.priceData?.valueVi || ""} VND`;
  const priceEn = `${doctorInfo?.Doctor_Infor?.priceData?.valueEn || ""} USD`;

  const nameVi = `${doctorInfo?.positionData?.valueVi || ""} - ${
    doctorInfo?.username || ""
  }`;
  const nameEn = `${doctorInfo?.positionData?.valueEn || ""} - ${
    doctorInfo?.username || ""
  }`;

  const timeVi = `${data?.timeTypeData?.valueVi || ""}`;
  const timeEn = `${data?.timeTypeData?.valueEn || ""}`;

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("T")[0].split("-");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="py-6 flex items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={doctorInfo?.image}
          alt="Doctor"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="px-4 space-y-2 ml-4 max-w-[350px]">
        <div className="text-base text-gray-800 h-auto w-full">
          {doctorInfo?.positionData && (
            <div className="text-gray-700">
              {locale === "vi" ? nameVi : nameEn}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-1 md:space-y-0 w-full">
          <FaCalendarDays className="text-base text-gray-500" />

          <div className="text-xs text-yellow-400 font-lato w-full md:w-1/2 truncate min-w-0">
            {data?.timeTypeData && (
              <span>{locale === "vi" ? timeVi : timeEn}</span>
            )}
          </div>

          {data?.date ? (
            <div className="text-xs text-gray-500 font-lato w-full md:w-1/2 truncate min-w-0">
              {formatDate(data.date)}
            </div>
          ) : (
            <div className="text-xs text-gray-400 font-lato w-full md:w-1/2 truncate min-w-0 italic">
              Chưa có ngày
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <HiOutlineBuildingOffice2 className="text-lg text-gray-900" />
          <div className="text-black text-xs">
            {doctorInfo?.Doctor_Infor?.nameClinic}
          </div>
        </div>

        <div className="text-xs text-gray-700 w-full md:w-3/4 font-lato  max-w-full">
          {doctorInfo?.Doctor_Infor?.addressClinic}
        </div>

        <div className="flex items-center space-x-2">
          <p>Giá Khám:</p>
          <div className="text-gray-700">
            {locale === "vi" ? priceVi : priceEn}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDoctor;
