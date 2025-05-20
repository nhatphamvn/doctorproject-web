import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchAllDoctors,
  fetchDoctorById,
} from "../../../redux/features/doctorSlide/actions/doctorActions";
import { fetchTimes } from "../../UserManagement/redux/allCodeSlides/actions/allcodeActions";
import { createSchedules } from "../../../redux/features/doctorSlide/actions/doctorActions"; // Import action createSchedules

const Appointment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState([]);

  const dispatch = useDispatch();
  const { doctors, doctor } = useSelector((state) => state.doctors);
  const { times } = useSelector((state) => state.allcode);
  const locale = useSelector((state) => state.language.locale);

  const handleToggleTime = (key) => {
    setSelectedTimes((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((t) => t !== key)
        : [...prevSelected, key]
    );
  };

  const handleSubmitSchedule = async () => {
    if (!selectedOption || selectedTimes.length === 0 || !selectedDate) {
      alert("Vui lòng chọn đầy đủ bác sĩ, ngày và ít nhất một khung giờ.");
      return;
    }

    const doctorId = selectedOption.value;
    const date = selectedDate.toISOString().split("T")[0]; // Format yyyy-mm-dd

    const scheduleData = selectedTimes.map((timeType) => {
      const matchedTime = times.find((t) => t.key === timeType);
      return {
        doctorId,
        date,
        timeId: matchedTime?.id,
        timeType,
      };
    });

    // Dispatch Redux action để tạo lịch
    try {
      const response = await dispatch(
        createSchedules({ doctorId, date, timeType: selectedTimes })
      );

      if (response?.EC === 0) {
        alert("Tạo lịch khám thành công!");
      } else {
        alert(`Lỗi: ${response.EM}`);
      }
    } catch (error) {
      console.error("Lỗi khi tạo lịch khám:", error);
      alert("Có lỗi xảy ra khi tạo lịch khám. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchTimes());
  }, [dispatch]);

  const handleChageSelected = (options) => {
    setSelectedOption(options);
    dispatch(fetchDoctorById(options.value));
  };

  const doctorOptions = doctors?.map((doctor) => ({
    value: doctor.id,
    label: doctor.username,
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="text-center text-2xl text-blue-600 font-sans">
        <h2>Tạo Lịch Khám Bác Sĩ</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Select bác sĩ */}
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Chọn Bác Sĩ
          </label>
          <Select
            options={doctorOptions}
            value={selectedOption}
            onChange={handleChageSelected}
            placeholder="Chọn Bác Sĩ..."
          />
        </div>

        {/* Date picker */}
        <div className="w-96 sm:w-1/2 ">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Chọn Ngày
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="w-96 p-1.5 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Chọn ngày"
          />
        </div>
        <div>
          <p className="text-gray-700 text-sm">
            Ngày bạn chọn:{" "}
            <strong>{selectedDate.toLocaleDateString("vi-VN")}</strong>
          </p>
        </div>
      </div>
      <div className="pt-6 h-auto w-full flex flex-wrap gap-2  sm:gap-4">
        {times &&
          times.length > 0 &&
          times.map((item, index) => {
            return (
              <span
                key={index}
                onClick={() => handleToggleTime(item.key)}
                className={`border-2 p-2 text-center text-lg rounded-md cursor-pointer w-[45%] sm:w-[25%]
                  ${
                    selectedTimes.includes(item.key)
                      ? "bg-yellow-300"
                      : "hover:bg-blue-100"
                  }`}
              >
                {locale === "vi" ? item.valueVi : item.valueEn}
              </span>
            );
          })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmitSchedule}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Tạo Lịch Khám
        </button>
      </div>
    </div>
  );
};

export default Appointment;
