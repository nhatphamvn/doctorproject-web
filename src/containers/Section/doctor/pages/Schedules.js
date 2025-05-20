import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllScheduleDoctors } from "../../../../service/otherUserService";
import ModalCreateSchedule from "../modal/ModalCreateSchedule";
import { FaCalendarPlus } from "react-icons/fa";

const Schedules = ({ doctorId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);
  const [show, setShowSchedule] = useState(false);
  const [dataSchedule, setDataSchedule] = useState({});

  const handleSChedule = (item) => {
    setShowSchedule(true);
    setDataSchedule(item);
  };

  // Tạo danh sách 7 ngày tới và chọn mặc định là hôm nay
  useEffect(() => {
    const today = new Date();
    const options = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formatted = date.toISOString().split("T")[0]; // YYYY-MM-DD
      options.push({
        value: formatted,
        label: formatted,
      });
    }

    setDateOptions(options);
    setSelectedDate(options[0]); // ✅ Chọn mặc định ngày hôm nay
  }, []);

  // Gọi API khi selectedDate thay đổi
  useEffect(() => {
    if (selectedDate) {
      handleChange(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  // Gọi API khi chọn ngày
  const handleChange = async (selectedOption) => {
    setSelectedDate(selectedOption);

    try {
      const res = await getAllScheduleDoctors(doctorId, selectedOption.value);
      if (!res) {
        console.log("error schedule", res.EM);
      } else {
        setScheduleData(res.DT);
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch khám:", error);
    }
  };

  return (
    <div>
      <div className="w-36">
        <Select
          options={dateOptions}
          value={selectedDate}
          onChange={handleChange}
          placeholder="Chọn ngày"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: "transparent",
              border: "none",
              borderBottom: state.isFocused
                ? "2px solid #3b82f6"
                : "1px solid #d1d5db", // màu blue hoặc xám
              boxShadow: "none",
              borderRadius: 0,
              minHeight: "32px",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#4888be",
              fontWeight: "bold",
            }),
          }}
        />
      </div>
      <div className="p-2 mt-1 ">
        <div className="flex items-center space-x-2">
          <FaCalendarPlus className="text-gray-700" />
          <h3>Lịch Khám</h3>
        </div>
        {scheduleData.length > 0 ? (
          <ul className="grid grid-cols-2 gap-2 mt-2">
            {scheduleData.map((item) => (
              <li
                key={item.id}
                className="mb-2 text-center text-xs w-36 p-1 bg-yellow-300 text-black cursor-pointer font-bold"
                onClick={() => handleSChedule(item)}
              >
                {item.timeTypeData?.valueEn}
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có lịch hoặc chưa chọn ngày.</p>
        )}
      </div>
      <ModalCreateSchedule
        show={show}
        data={dataSchedule}
        setShow={setShowSchedule}
      />
    </div>
  );
};

export default Schedules;
