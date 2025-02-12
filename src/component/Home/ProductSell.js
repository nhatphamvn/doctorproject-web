import React, { useState } from 'react';
import { ApiCreateNewProduct } from '../../service/apiProduct';
import { useNavigate } from 'react-router-dom';

const ProductSell = () => {
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preImage, setPreImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  
  console.log('all',nameProduct,price,description,image);
  const handleUploadFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      setPreImage(URL.createObjectURL(file));
      setImage(file);
  }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu trước khi gửi
    if (!nameProduct || !price || !description || !image) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const data = await ApiCreateNewProduct(nameProduct, price, description, image);
      if (data && data.EC === 0) {
        navigate("/"); // Điều hướng sau khi tạo sản phẩm thành công
      } else {
        setErrorMessage("Lỗi tạo sản phẩm! Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi API:", error);
      setErrorMessage("Lỗi kết nối máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-12 p-6 bg-gray-300 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Bán Sản Phẩm</h1>

      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tên sản phẩm</label>
          <input
            type="text"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
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
        <div className="flex flex-col items-center">
          <label className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-100">
            {preImage ? (
              <img src={preImage} alt="Preview" className="w-full h-full object-cover rounded-md" />
            ) : (
              <div className="flex flex-col items-center">
                <span className="mt-2">Chọn ảnh</span>
              </div>
            )}
            <input type="file" className="hidden" onChange={handleUploadFile} />
          </label>
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đăng Bán"}
        </button>
      </form>
    </div>
  );
};

export default ProductSell;
