import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiGetProductById, ApiUpdateProduct } from '../../service/apiProduct';

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Lấy thông tin sản phẩm cũ
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ApiGetProductById(id);
        if (data && data.EC === 0) {
          setName(data.name);
          setPrice(data.price);
          setDescription(data.description);
        } else {
          setErrorMessage("Không tìm thấy sản phẩm!");
        }
      } catch (error) {
        setErrorMessage("Lỗi tải dữ liệu!");
      }
    };
    fetchProduct();
  }, [id]);

  // Xử lý cập nhật sản phẩm
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!name || !price || !description) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const data = await ApiUpdateProduct(id, name, price, description );

      if (data && data.EC === 0) {
        setSuccessMessage("Cập nhật thành công!");
        setTimeout(() => navigate('/'), 1500); // Chuyển hướng sau 1.5 giây
      } else {
        setErrorMessage("Cập nhật thất bại! Vui lòng thử lại.");
      }
    } catch (error) {
      setErrorMessage("Lỗi kết nối máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-12 p-6 bg-gray-300 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Cập Nhật Sản Phẩm</h1>

      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tên sản phẩm</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Đang cập nhật..." : "Cập Nhật"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
