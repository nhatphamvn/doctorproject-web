import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { CiCamera } from "react-icons/ci";
import {
  fetchGenders,
  fetchPositions,
  fetchRoles,
} from "../redux/allCodeSlides/actions/allcodeActions";
import {
  fetchUsers,
  updateUser,
} from "../redux/userSlides/actions/userActions";
import _ from "lodash";

const ReduxUpdateUsers = ({ show, setShow, dataUpdate }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPositions] = useState("");
  const [role, setRoles] = useState("");
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  // console.log("check dataUpdate", dataUpdate);
  const { genders, positions, roles } = useSelector((state) => state.allcode);
  useEffect(() => {
    if (show && !_.isEmpty(dataUpdate)) {
      setUsername(dataUpdate.username);
      setEmail(dataUpdate.email);
      setPhoneNumber(dataUpdate.phone);
      setAddress(dataUpdate.address);
      setGender(dataUpdate.gender);
      setPositions(dataUpdate.positionId);
      setRoles(dataUpdate.roleId);

      if (dataUpdate?.image) {
        try {
          const cleanBase64 =
            dataUpdate.image.split(",")[1] || dataUpdate.image;
          setImage(atob(cleanBase64));
        } catch (error) {
          console.error("Lỗi giải mã Base64:", error);
          setImage(null);
        }
      }
    }
  }, [show, dataUpdate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn một file ảnh!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    dispatch(fetchGenders());
    dispatch(fetchPositions());
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleClose = () => {
    setUsername("");
    setPhoneNumber("");
    setAddress("");
    setGender("");
    setImage("");
    setShow(false);
  };

  const handleSubmitUpdate = async () => {
    try {
      dispatch(
        updateUser({
          id: dataUpdate.id,
          username,
          phone,
          address,
          image,
          gender,
          roleId: role,
          positionId: position,
        })
      );
      await dispatch(fetchUsers());
      handleClose();
    } catch (error) {
      console.log("❌ Lỗi khi gửi request:", error);
    }
  };

  return (
    <Modal
      isOpen={show}
      className="bg-white p-6 rounded-lg shadow-lg w-1/3 mx-auto outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-xl font-mono text-red-500 mb-4">Update Users</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Ảnh đại diện</label>
          <div className="relative w-20 h-20">
            {image ? (
              <img
                src={image} // Hiển thị ảnh nếu có
                alt="Avatar"
                className="w-20 h-20 object-cover rounded-full mb-2"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full mb-2">
                <p className="text-gray-500 text-sm">No image</p>
              </div>
            )}

            {/* Overlay và icon máy ảnh */}
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-50 transition-opacity duration-300 cursor-pointer"
            >
              <CiCamera className="text-white text-xl" />
            </label>

            {/* Input file ẩn */}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Tên của bạn</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Số Điện Thoại</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Địa chỉ</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Giới tính</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Chọn giới tính</option>
            {genders.map((item) => (
              <option key={item.id} value={item.key}>
                {item.valueVi}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Vị Trí</label>
          <select
            value={position}
            onChange={(e) => setPositions(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Chọn vị trí</option>
            {positions.map((item) => (
              <option key={item.id} value={item.key}>
                {item.valueVi}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Vai Trò</label>
          <select
            value={role}
            onChange={(e) => setRoles(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Chọn vai trò</option>
            {roles.map((item) => (
              <option key={item.id} value={item.key}>
                {item.valueVi}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
          onClick={handleSubmitUpdate}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={handleClose}
        >
          Đóng
        </button>
      </div>
    </Modal>
  );
};

export default ReduxUpdateUsers;
