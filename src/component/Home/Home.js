import React, { useState, useEffect } from 'react';
import { ApiGetAllProduct } from '../../service/apiProduct';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiGetAllProduct();
        setProducts(response.DT); // ✅ Lấy đúng danh sách sản phẩm
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto flex">
          <aside className="w-1/4 bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Lọc sản phẩm</h2>
            <div className="space-y-2">
              <label className="block">
                <input type="checkbox" className="mr-2" /> Giá dưới 500k
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Giá từ 500k - 1 triệu
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Giá trên 1 triệu
              </label>
            </div>
          </aside>
        {/* Danh sách sản phẩm */}
        <main className="w-3/4 grid grid-cols-3 gap-4 p-4">
          {products.map((product, index) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-gray-600">Giá: {product.price} USD</p>
              <p className="text-gray-300">{product.description}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                Mua ngay
              </button>
            </div>
          ))}
        </main>
      </div>

      <footer className="mt-8 bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 Shop Online. Mọi quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default Home;
