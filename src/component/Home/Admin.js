import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navagate = useNavigate()
  const handleDeleteForm=()=>{
      navagate('/delete-product')
  }
  const handleUpdateForm=()=>{
      navagate('/update-product')
  }
  const handleClose=()=>{
      navagate('/update-product')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Bố cục button điều khiển */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <button
          onClick={handleUpdateForm}
          className="w-60 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          Cập nhật sản phẩm
        </button>

        <button
          onClick={handleDeleteForm}
          className="w-60 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Xóa sản phẩm
        </button>

        <button
          onClick={handleClose}
          className="w-60 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default Admin;
