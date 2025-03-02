import React, { useState, useEffect } from 'react';
import { ApiGetAllProduct } from '../../service/apiProduct';
import { useNavigate } from 'react-router-dom';
import ChatAsk from './ChatAsk';

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
    <>
    <ChatAsk/>
  <div className="flex flex-col min-h-screen">
  

  {/* Nội dung trang */}
  <main className="flex-grow p-4">
    <div className="container mx-auto flex flex-col">
      <div className="flex">
        <button className="text-black m-2 font-mono" onClick={handleCreateProduct}>Bán Hàng</button>
        {/* Danh sách sản phẩm */}
        <main className="w-3/4 grid grid-cols-3 gap-4 p-4">
          {products.map((product, index) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md" onClick={() => hanldeRedirect(product.id)}>
              <h3 className="mt-2 font-sans text-black">{product.name}</h3>
              <p className="text-red-500">Giá: {product.price} USD</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  </main>

  {/* Footer cố định dưới */}
    </div>
    
    </>

  );
};

export default Home;