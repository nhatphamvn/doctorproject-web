import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGenders,
  fetchPositions,
  fetchRoles,
} from "../redux/allCodeSlides/actions/allcodeActions";
import { ClipLoader } from "react-spinners";
import { IoMdCloudUpload } from "react-icons/io";
import { validateForm } from "../../../utils/validate/formValidation";
import {
  createUsers,
  fetchUsers,
} from "../redux/userSlides/actions/userActions";
import { useNavigate } from "react-router-dom";

const UserRedux = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [fileBase64, setSelectFile] = useState(null);
  const [username, setUsername] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGenders] = useState("");
  const [position, setPositions] = useState("");
  const [role, setRoles] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.language.locale);
  const { genders, positions, roles } = useSelector((state) => state.allcode);
  useEffect(() => {
    dispatch(fetchGenders());
    dispatch(fetchPositions());
    dispatch(fetchRoles());
  }, [dispatch]);

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

  console.log("base64", fileBase64);

  const handleListUsers = () => {
    navigate("/system/list-users-redux");
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const formValues = { username, email, password, phone, address };
    const validationErrors = validateForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Lưu lỗi vào state
      return;
    }
    setLoading(true);

    setTimeout(async () => {
      try {
        await dispatch(
          createUsers({
            username,
            email,
            address,
            phone,
            password,
            image: fileBase64 || null,
            gender,
            role,
            position,
          })
        );
        await dispatch(fetchUsers());
        navigate("/system/list-users-redux");
      } catch (error) {
        console.error("Lỗi:", error);
        alert("Đã xảy ra lỗi!");
      }
      setLoading(false); // Tắt loading sau 3 giây
    }, 2000);
  };

  return (
    <>
      <div>
        <button onClick={handleListUsers}>Danh sách</button>
      </div>
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-100 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Thông Tin Người Dùng
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4 md:col-span-2">
              <div className="mb-4">
                <label className="flex items-center justify-center text-lg font-medium text-gray-700">
                  Ảnh đại diện
                </label>
              </div>
              <div className="flex items-center justify-center">
                {/* Label Upload */}
                <label
                  htmlFor="image"
                  className="text-sm font-medium text-white bg-green-600 w-28 h-10 rounded-full flex items-center justify-center gap-2 shadow-md cursor-pointer font-mono mr-10"
                >
                  <IoMdCloudUpload className="w-5 h-5 text-white" />
                  Tải ảnh
                </label>

                {/* Input Upload */}
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />

                {/* Preview Image */}
                <div className="flex items-center justify-center ml-2 border-solid border-2 w-32 h-32 rounded-full text-gray-400 overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover object-center rounded-full"
                    />
                  ) : (
                    "Preview Image"
                  )}
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tên người dùng
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập tên người dùng"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Address - Span full width */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Địa chỉ
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập địa chỉ"
                rows="3"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Giới Tính
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGenders(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Chọn giới tính</option>
                {genders && genders.length > 0 ? (
                  genders.map((item) => (
                    <option key={item.id} value={item.key}>
                      {locale === "vi" ? item.valueVi : item.valueEn}
                    </option>
                  ))
                ) : (
                  <option value="">Đang tải...</option>
                )}
              </select>
            </div>

            {/* Position */}
            <div className="mb-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700"
              >
                Chức vụ
              </label>
              <select
                value={position}
                onChange={(e) => setPositions(e.target.value)}
                id="position"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Chọn Chức Vụ</option>
                {positions && positions.length > 0 ? (
                  positions.map((item) => (
                    <option key={item.id} value={item.key}>
                      {locale === "vi" ? item.valueVi : item.valueEn}
                    </option>
                  ))
                ) : (
                  <option value="">Đang tải...</option>
                )}
              </select>
            </div>

            {/* Role */}
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Vai trò
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRoles(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Chọn Vai Trò</option>
                {roles && roles.length > 0 ? (
                  roles.map((item) => (
                    <option key={item.id} value={item.key}>
                      {locale === "vi" ? item.valueVi : item.valueEn}
                    </option>
                  ))
                ) : (
                  <option value="">Đang tải...</option>
                )}
              </select>
            </div>

            {/* Submit Button - Span full width */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleCreateUser}
              >
                {loading ? (
                  <ClipLoader size={20} color="#ffffff" />
                ) : (
                  "Tạo tài khoản"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRedux;
