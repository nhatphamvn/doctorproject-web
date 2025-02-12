import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiGetProductById } from '../../service/apiProduct';

const DescriptionProduct = () => {
  const { id } = useParams();
  console.log('check id', id);
  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ApiGetProductById(id);
        setProduct(response.DT);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto flex gap-10 bg-white p-10 rounded-lg shadow-lg w-4/5">
        <div className="w-2/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="w-3/5">
          <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 text-2xl mb-6">Giá: {product.price} USD</p>
          <p className="text-gray-500 mb-6 text-lg">{product.description}</p>
          <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md text-xl font-semibold">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default DescriptionProduct;
