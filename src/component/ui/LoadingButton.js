import { useState } from "react";
import { ClipLoader } from "react-spinners";

const LoadingButton = ({ onClick, children, disabled, delay = 4000 }) => {
  const [manualLoading, setManualLoading] = useState(false);

  const handleClick = () => {
    if (manualLoading) return;

    setManualLoading(true);
    setTimeout(() => {
      setManualLoading(false);
      onClick(); // Gọi hàm xử lý sự kiện từ props
    }, delay);
  };

  return (
    <button
      onClick={handleClick}
      disabled={manualLoading || disabled}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {manualLoading ? <ClipLoader size={20} color="#ffffff" /> : children}
    </button>
  );
};

export default LoadingButton;
