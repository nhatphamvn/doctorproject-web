import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ApiLoginUsers } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import {handleLoginSuccess } from '../../../redux/features/authSlide/authSlide'
import { useDispatch } from "react-redux";

const LoginPage = () => {
const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!password.trim()) {
      newErrors.password = "Password không được để trống.";
    }
    return newErrors;
  };

  const handleKeyDown =(e)=>{
    if (e.key === "Enter") {
      handleLogin(e);
    }
  }

  const handleLogin =async (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload trang khi nhấn nút
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      try {
        const data = await ApiLoginUsers(email, password);

        if (data.EC === 0) {
          sessionStorage.setItem('access_token',data.DT.access_token)
          dispatch(handleLoginSuccess(data))
          navigate('/');
        } else if (data && data.EC !== 0) {
          setErrors({ server: "Đăng nhập không thành công!" });
        }
      } catch (error) {
        setErrors({ server: "Đăng nhập không thành công, Thử lại sau!" });
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-wrap p-5 bg-gray-100 ">
      {/* Form Title */}
      <div className="max-w-md mr-12 text-left">
        <h1 className="hidden xs:block text-5xl font-fantasy text-red-600 mb-2">
          Sunday4
        </h1>
        <p className="hidden sm:block text-xl text-pink-500 leading-relaxed font-fantasy">
          From the bitterness of disease man learns the sweetness of health.
        </p>
      </div>

      {/* Form Login */}
      <div className="max-w-md bg-white p-5 rounded-lg shadow-md w-full">
        <form>
            {errors.server && (
              <div className="w-full mb-4 border-2 border-red-500 rounded-md">
                <p className="text-red-500 text-sm mt-1 py-4 px-8 text-center font-bold">{errors.server}</p>
              </div>
            )}
          {/* Email Input */}
          <div className="mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="w-full p-3 border border-gray-500 rounded-md text-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-500 rounded-md text-lg"
              onKeyDown={(e)=>handleKeyDown(e)}
            />
          
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin} // Sử dụng sự kiện onClick thay vì onSubmit
            className="w-full bg-blue-500 text-white p-3 text-base font-mono rounded-md transition hover:bg-blue-600"
          >
            Log In
          </button>
        </form>

        {/* Forgotten Password */}
        <a
          href="#!"
          onClick={(e) => e.preventDefault()}
          className="block text-center mt-4 text-sm text-blue-500 hover:underline font-mono"
        >
          Forgotten password?
        </a>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Create New Account */}
        <button className="w-full bg-green-500 text-white p-3 text-base font-mono rounded-md transition hover:bg-green-600">
          <Link to="/register">Create New Account</Link>
        </button>
      </div>
    </div>
  );
}

export default LoginPage
