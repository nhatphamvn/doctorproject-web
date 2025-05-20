import { useState, useEffect } from "react";
import Modal from "react-modal";
import { validateForm } from "../../../../utils/validate/formValidation";
import bgImage from "../../../../assets/image/bgschedule.jpg";
import { IoClose } from "react-icons/io5";
import ProfileDoctor from "../pages/ProfileDoctor";
import { ApiCreateBooking } from "../../../../service/otherUserService";
import { fetchGenders } from "../../../../features/UserManagement/redux/allCodeSlides/actions/allcodeActions";
import { useDispatch, useSelector } from "react-redux";

Modal.setAppElement("#root");

const ModalCreateSchedule = ({ data, show, setShow }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { genders } = useSelector((state) => state.allcode);
  const locale = useSelector((state) => state.language.locale);
  useEffect(() => {
    dispatch(fetchGenders());
  }, [dispatch]);

  const renderScheduleDateTime = (data, locale) => {
    if (!data || !data.timeTypeData || !data.date)
      return "No schedule available";

    const time =
      locale === "vi" ? data.timeTypeData.valueVi : data.timeTypeData.valueEn;

    const formatDate = (isoDate) => {
      if (!isoDate) return "";
      const [year, month, day] = isoDate.split("T")[0].split("-");
      return `${day}-${month}-${year}`;
    };

    const date = formatDate(data.date);

    return `${time} - ${date}`;
  };

  const timeDate = renderScheduleDateTime(data, locale);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setDateOfBirth("");
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

    const res = await ApiCreateBooking({
      username,
      email,
      address,
      gender,
      phone,
      date: dateOfBirth,
      doctorId: data?.doctorId,
      timeType: data?.timeType,
      language: locale,
      timeDate: timeDate,
      doctorName: data?.nameData?.username,
    });
    if (res && res.EC === 0) {
      alert("oke");
      setShow(false);
    } else {
      console.log(res.EM);
    }
    resetForm();
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      className="bg-white rounded-3xl shadow-lg w-full max-w-3xl h-[500px] mx-auto outline-none overflow-hidden flex"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{
        content: {
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      {/* Bên trái: Form */}
      <div className="w-1/2 p-6 overflow-y-auto overflow-x-hidden bg-white box-border">
        <h1 className="text-2xl font-semibold text-blue-600">Đặt Lịch Hẹn</h1>
        <ProfileDoctor doctorId={data.doctorId} data={data} />
        <p className="text-lg font-semibold text-blue-400 py-4">
          Thông Tin Bệnh Nhân
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md box-border" // Thêm box-border
              placeholder="Họ Và Tên"
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
              className="w-full p-2 border rounded-md box-border"
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
              className="w-full p-2 border rounded-md box-border"
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
              className="w-full p-2 border rounded-md box-border"
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
              className="w-full p-2 border rounded-md"
            >
              <option value="">Chọn giới tính</option>
              {genders &&
                genders.length > 0 &&
                genders.map((item) => (
                  <option key={item.id} value={item.key}>
                    {item.valueVi}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-1 border rounded-md box-border"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full relative overflow-x-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white opacity-100 z-10 pointer-events-none"></div>

        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute bottom-6 right-8 z-20">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleCreateSchedule}
          >
            Đăng kí
          </button>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <button
            className="py-2 px-2 text-gray-200 rounded text-3xl"
            onClick={handleClose}
          >
            <IoClose />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateSchedule;
