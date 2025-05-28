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
      <div>
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={doctorInfo?.image}
            alt="Doctor"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      <div className="px-4 space-y-2 ml-4">
        <div className="text-base text-gray-800 h-auto w-96">
          {doctorInfo?.positionData && (
            <div className="text-gray-700">
              {locale === "vi" ? nameVi : nameEn}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <FaCalendarDays className="text-base text-gray-500" />
          <div className="text-yellow-600 text-sm">
            {data?.timeTypeData && (
              <span>{locale === "vi" ? timeVi : timeEn}</span>
            )}
          </div>
          <div className="text-gray-700 text-sm">
            {data?.date ? formatDate(data.date) : "No date available"}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <HiOutlineBuildingOffice2 className="text-lg text-gray-900" />
          <div className="text-black text-xs">
            {doctorInfo?.Doctor_Infor?.nameClinic}
          </div>
        </div>

        <div className="text-xs text-gray-700 w-60">
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
