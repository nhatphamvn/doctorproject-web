import { useState } from "react";
import Modal from "react-modal";
import { validateForm } from "../../../../utils/validate/formValidation";

Modal.setAppElement("#root");

const ModalCreateSchedule = ({ show, setShow }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});

  const handleClose = () => setShow(false);

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
    alert("oke");
    setErrors({});
  };

  return (
    <>
      <div className="bg-gray-100">
        <Modal
          isOpen={show}
          className="bg-white p-6 rounded-lg shadow-lg w-auto h-96 mx-auto outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="flex">
            <div>
              <h1 className="text-2xl font-semibold text-blue-600">
                Đặt Lịch Hẹn
              </h1>
              <p className="text-lg font-semibold text-blue-400 py-4">
                Thông Tin Bệnh Nhân
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* Username */}
                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Họ Và Tên"
                    required
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm px-4">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Email"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm px-4">{errors.email}</p>
                  )}
                </div>

                {/* Số điện thoại */}
                <div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Số Điện Thoại"
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm px-4">{errors.phone}</p>
                  )}
                </div>

                {/* Địa chỉ */}
                <div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Địa Chỉ"
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm px-4">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Giới tính */}
                <div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full p-1 border rounded-md"
                    placeholder="Ngày Sinh"
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm px-4">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>Hello</div>
          </div>
          <div className="flex justify-end">
            <button
              className="mt-4 mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleCreateSchedule}
            >
              Create
            </button>
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ModalCreateSchedule;
