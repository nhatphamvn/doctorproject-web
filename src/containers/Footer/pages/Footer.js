import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-pink-400 to-green-400 p-2 shadow-lg w-full text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-row items-start justify-center gap-12">
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-xl font-bold">
              Công ty Cổ phần Công nghệ Sunday4
            </h1>
            <p className="mt-2 text-sm text-gray-800">
              Địa chỉ: 109 Kiều Phụng, Phường Hoà Xuân, Quận Cẩm Lệ, TP. Đà Nẵng
            </p>
            <p className="text-sm text-gray-800">Email: phvnnhat@gmail.com</p>
          </div>

          <div className="flex flex-col text-center md:text-right">
            <h1 className="text-lg font-semibold">Đối tác bảo trợ nội dung</h1>
            <p className="mt-2 text-sm text-gray-800">
              Công ty TNHH Sunday4444
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-500">Pham Van Nhat.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
