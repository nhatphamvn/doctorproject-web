import React, { useState, useEffect } from 'react';
import { ApiGetAllProduct } from '../../service/apiProduct';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const hanldeRedirect = (itemId) => {
    navigate(`/description-product/${itemId}`)
  }
  const handleCreateProduct =()=>{
    navigate('/add-product')
  }

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

  return (
   <div className="flex flex-col min-h-screen">
  {/* Nội dung trang */}
  <main className="flex-grow p-4">
    <div className="container mx-auto flex flex-col">
      <nav className="bg-gray-500 p-2 shadow-md flex">
        <button className="text-white m-2 font-mono">Giảm giá</button>
        <button className="text-white m-2 font-mono" onClick={handleCreateProduct}>Bán Hàng</button>
      </nav>

      <div className="flex">
        <aside className="w-1/4 bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Lọc sản phẩm</h2>
          <div className="space-y-2">
            <label className="block"><input type="checkbox" className="mr-2" /> Giá dưới 500k</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Giá từ 500k - 1 triệu</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Giá trên 1 triệu</label>
          </div>
        </aside>

        {/* Danh sách sản phẩm */}
        <main className="w-3/4 grid grid-cols-3 gap-4 p-4">
          {products.map((product, index) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md" onClick={() => hanldeRedirect(product.id)}>
              <h3 className="mt-2 font-sans text-black">{product.name}</h3>
              <p className="text-red-500">Giá: {product.price} USD</p>
              <div className="flex text-yellow-500 mt-2">
                {[...Array(5)].map((_, i) => (<span key={i}>&#9733;</span>))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  </main>

  {/* Footer cố định dưới */}
  <footer className="w-full bg-gray-800 text-white text-center p-4">
    <p className='font-mono text-pink-500'>&copy; Welcome To Sunday4. Mọi quyền được bảo lưu.</p>
  </footer>
</div>

  );
};

export default Home;