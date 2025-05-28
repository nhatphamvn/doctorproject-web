import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa"; // ✅ Thêm icon loading
import { ApiCreateRemedy } from "../../../service/otherUserService";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

const ModalCheckPatient = ({ onSuccess, account, data, show, setShow }) => {
  const [image, setImagePreview] = useState(null);
  const [fileBase64, setSelectFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // ✅ Thêm state loading

  const language = useSelector((state) => state.language.locale);

  const resetForm = () => {
    setImagePreview("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectFile(reader.result);
        setImagePreview(URL.createObjectURL(file));
      };
    }
  };

  const handleClose = () => {
    resetForm();
    setShow(false);
  };

  const handleCreateSendRemedy = async () => {
    setIsLoading(true); // ✅ Bắt đầu loading
    try {
      const res = await ApiCreateRemedy({
        email: data.patientData.email,
        doctorId: data.doctorId,
        patientId: data.patientId,
        image: fileBase64,
        language: language,
        timeType: data.timeType,
        date: data.date,
        username: account.username,
      });
      if (res && res.EC === 0) {
        console.log(res.EM);
        if (typeof onSuccess === "function") {
          onSuccess();
        }
        setShow(false);
      } else {
        console.log(res.EM);
      }
      setShow(false);
    } catch (error) {
      console.error("Lỗi:", error);
    }
    setIsLoading(false); // ✅ Kết thúc loading
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      {/* Nút đóng */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
      >
        <IoClose size={24} />
      </button>

      {/* Tiêu đề */}
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
        Xác Nhận Lịch Hẹn
      </h2>
      <div className="flex">
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Tên:</strong> {data?.patientData?.username || "Không rõ"}
          </p>
          <p>
            <strong>SĐT:</strong> {data?.patientData?.phone || "Không rõ"}
          </p>
          <p>
            <strong>Giới tính:</strong>{" "}
            {data?.patientData?.genderData?.valueVi || "Không rõ"}
          </p>
          <p>
            <strong>Khung giờ:</strong> {data?.timeData?.valueVi || "Không rõ"}
          </p>
        </div>
        <div className="ml-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Chọn Hình Ảnh
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label
            htmlFor="image"
            className="flex items-center justify-center ml-2 border-solid border-2 w-48 h-24 text-gray-400 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <span className="text-3xl text-gray-700">
                <CiImageOn />
              </span>
            )}
          </label>
        </div>
      </div>

      {/* Nút gửi */}
      <div className="mt-6 text-center">
        <button
          onClick={handleCreateSendRemedy}
          disabled={isLoading} // ✅ Disable khi loading
          className={`p-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-600 transition font-medium flex items-center justify-center mx-auto ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Đang gửi...
            </>
          ) : (
            "Gửi Xác Nhận"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ModalCheckPatient;
