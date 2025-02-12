import React, { useState, useEffect } from "react";
import { ApiGetAllProduct } from "../../service/apiProduct";
import { useNavigate } from 'react-router-dom';

const UpdateForm = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiGetAllProduct();
        setProducts(response.DT);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  // Xóa sản phẩm
  const handleUpdate = (itemId) => {
    navigate(`/update-products/${itemId}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Quản lý sản phẩm</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Không có sản phẩm nào để xóa.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-red-500">Giá: {product.price} USD</p>
              <button
                className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-red-700 transition"
                onClick={() => handleUpdate(product.id)}
              >
                Cập Nhật
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpdateForm
