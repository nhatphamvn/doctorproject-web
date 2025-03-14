import React from 'react';

const Footer = () => {
  return (
    <div className="w-full bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-row items-start justify-center gap-12">

          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-xl font-bold">Công ty Cổ phần Công nghệ Sunday4</h1>
            <p className="mt-2 text-sm text-gray-400">
              Địa chỉ: 123 Đường Công Nghệ, TP. Hồ Chí Minh
            </p>
            <p className="text-sm text-gray-400">Email: contact@sunday4.com</p>
          </div>

          <div className="flex flex-col text-center md:text-right">
            <h1 className="text-lg font-semibold">Đối tác bảo trợ nội dung</h1>
            <p className="mt-2 text-sm text-gray-400">Công ty TNHH Truyền Thông XYZ</p>
          </div>

        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-500">
            Sunday4. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
