import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ApiRegisterNewUser } from "../services/AuthService";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username không được để trống.";
    }
    if (!email.trim()) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone không được để trống.";
    } else if (!/^\d{10,11}$/.test(phone)) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
    }
    if (!password) {
      newErrors.password = "Password không được để trống.";
    } else if (password.length < 6) {
      newErrors.password = "Password phải có ít nhất 6 ký tự.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password không khớp.";
    }
    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      try {
        const data = await ApiRegisterNewUser(email, password, username, phone);

        if (data.EC === 0) {
          navigate("/login");
        } else if (data && data.EC !== 0) {
          const newErrors = {};

          // Xử lý lỗi từ backend
          if (data.EM.includes("Email")) {
            newErrors.email = data.EM;
          }
          if (data.EM.includes("Số Điện Thoại")) {
            newErrors.phone = data.EM;
          }

          setErrors(newErrors);
        }
      } catch (error) {
        console.error("Đăng ký thất bại", error);
        setErrors((prev) => ({
          ...prev,
          server: "Đăng ký không thành công, vui lòng thử lại!",
        }));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-center text-3xl font-fantasy text-red-600">
            Sunday4
          </h1>
          <p className="text-lg text-pinkred mt-6 font-fantasy">
            Create your account
          </p>
        </div>
        <form className="space-y-4">
          {/* Input Username */}
          <div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            />
            {errors.username && (
              <p className="text-red-500 text-sm px-4">{errors.username}</p>
            )}
          </div>

          {/* Input Email */}
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm px-4">{errors.email}</p>
            )}
          </div>

          {/* Input Phone */}
          <div>
            <input
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-black"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm px-4">{errors.phone}</p>
            )}
          </div>

          {/* Input Password */}
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm px-4">{errors.password}</p>
            )}
          </div>

          {/* Input Confirm Password */}
          <div>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-black"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </form>

        <button
          className="w-full px-4 py-2 border bg-black text-white rounded-lg text-xl font-bold hover:bg-pinkred hover:text-white transition duration-300 mt-8"
          onClick={handleRegister}
        >
          Next
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span className="text-red-500 hover:underline">
              <Link to="/login">Log in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
