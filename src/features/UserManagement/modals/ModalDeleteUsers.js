import { useEffect } from "react";
import Modal from "react-modal";
import { ApiDeleteUsers } from "../services/userService";

const ModalDeleteUser = ({ show, setShow, dataDelete, fetchDataUser }) => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleClose = () => setShow?.(false);

  const handleDeleteUsers = async () => {
    try {
      const data = await ApiDeleteUsers(dataDelete.id);

      if (data?.EC === 0) {
        handleClose();
        await fetchDataUser();
      } else {
        console.log(data?.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose} // Cho phép đóng modal khi nhấn ra ngoài
      className="bg-white p-6 rounded-lg shadow-lg w-1/3 mx-auto outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-xl font-semibold">Delete Account</h2>
      <p className="mt-2 text-gray-600">
        Bạn có chắc xoá{" "}
        <span className="font-bold">{dataDelete?.email || "người dùng này"}</span>?
      </p>
      <div className="flex justify-end">
        <button
          className="mt-4 mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          onClick={handleDeleteUsers}
        >
          Delete
        </button>
        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
          onClick={handleClose}
        >
          Đóng
        </button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
