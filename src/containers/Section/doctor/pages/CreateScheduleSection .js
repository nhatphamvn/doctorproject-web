import { useState, useEffect } from "react";
import Modal from "react-modal";
import { validateForm } from "../../../../utils/validate/formValidation";
import bgImage from "../../../../assets/image/bgschedule.jpg";
import { IoClose } from "react-icons/io5";
import { ApiCreateBooking } from "../../../../service/otherUserService";
import {
  fetchGenders,
  fetchTimes,
} from "../../../../features/UserManagement/redux/allCodeSlides/actions/allcodeActions";
import { fetchDoctors } from "../../../../redux/features/doctorSlide/actions/doctorActions";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { toast } from "react-toastify";
Modal.setAppElement("#root");

const CreateScheduleSection = ({ data, show, setShow }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [timeSelected, setTimeSelected] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTimes, setSelectedTime] = useState(null);
  const [timesOptions, setTimesOptions] = useState([]);

  const dispatch = useDispatch();
  const { genders, times } = useSelector((state) => state.allcode);
  const locale = useSelector((state) => state.language.locale);
  const doctors = useSelector((state) => state.doctors?.doctors);

  useEffect(() => {
    dispatch(fetchGenders());
    dispatch(fetchDoctors());
    dispatch(fetchTimes());
  }, [dispatch]);

  const doctorOptions = doctors?.map((doctor) => ({
    value: doctor.id,
    label: doctor.username,
  }));
  const getTimesOptions = (locale, times) => {
    return times?.map((time) => ({
      value: time.key,
      label: locale === "vi" ? time.valueVi : time.valueEn,
    }));
  };

  useEffect(() => {
    setTimesOptions(getTimesOptions(locale, times));
  }, [locale, times]);

  const handleChageSelected = (options) => {
    setSelectedOption(options);
  };

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderScheduleDateTime = (selectedTimes, selectedDate, locale) => {
    if (!selectedTimes || !selectedTimes.label || !selectedDate)
      return "No schedule available";

    const time = selectedTimes.label;
    const date = formatDate(selectedDate);
    return `${time} - ${date}`;
  };

  const timeDate = renderScheduleDateTime(selectedTimes, selectedDate, locale);
  const dataDate = formatDate(selectedDate);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setDateOfBirth(null);
    setGender("");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    setShow(false);
  };

  const handleCreateSchedule = async () => {
    const validationErrors = validateForm({
      username,
      email,
      phone,
      address,
      dateOfBirth,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await ApiCreateBooking({
        username,
        email,
        address,
        gender,
        phone,
        date: dateOfBirth,
        doctorId: selectedOption?.value,
        timeType: timeSelected,
        language: locale,
        dataDate,
        timeDate: timeDate,
        doctorName: selectedOption?.label || "",
      });
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.warn(res.EM);
      }
    } catch (error) {
      alert("An error occurred while creating the booking.");
    }

    resetForm();
    setShow(false);
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      className="outline-none flex w-full max-w-3xl h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden
                 flex-col sm:flex-row"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      {/* Left: Form */}
      <div className="sm:w-2/3 w-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto max-h-[500px]">
        <div>
          <h1 className="text-2xl font-lato text-blue-400 mb-4">
            Đặt Lịch Hẹn
          </h1>
          <p className="text-lg font-mono text-blue-300 mb-4">
            Thông Tin Bệnh Nhân
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-200"
                placeholder="Họ và Tên"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-200"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-200"
                placeholder="Số Điện Thoại"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-200"
                placeholder="Địa Chỉ"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border rounded-md bg-gray-200"
              >
                <option value="">Chọn giới tính</option>
                {genders?.map((item) => (
                  <option key={item.id} value={item.key}>
                    {item.valueVi}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-50">
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 border rounded-md bg-gray-200 z-50"
                placeholderText="Chọn ngày sinh"
              />
            </div>
          </div>

          <p className="text-lg font-mono text-blue-300 mb-2">Chọn Bác Sĩ</p>
          <div className="space-y-3 max-w-xs">
            <Select
              options={doctorOptions}
              value={selectedOption}
              onChange={handleChageSelected}
              placeholder="Chọn Bác Sĩ..."
            />
            <Select
              options={timesOptions}
              value={selectedTimes}
              onChange={(option) => {
                setSelectedTime(option);
                setTimeSelected(option.value);
              }}
              placeholder="Chọn Thời Gian..."
            />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 border rounded-md bg-gray-200"
              placeholderText="Chọn ngày khám"
            />
          </div>
        </div>
      </div>

      {/* Right: Image & Buttons */}
      <div className="sm:w-1/3 w-full h-48 sm:h-full relative overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white z-10" />
        <div className="absolute bottom-6 right-6 z-20">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm sm:text-base"
            onClick={handleCreateSchedule}
          >
            Đăng ký
          </button>
        </div>
        <div className="absolute top-4 right-4 z-30">
          <button
            className="text-white text-3xl hover:text-gray-300"
            onClick={handleClose}
          >
            <IoClose />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateScheduleSection;
