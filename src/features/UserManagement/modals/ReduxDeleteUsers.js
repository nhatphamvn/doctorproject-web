import { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteUsers } from "../redux/userSlides/actions/userActions";

const ReduxDeleteUsers = ({ show, setShow, dataDelete }) => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  const dispatch = useDispatch();
  const handleClose = () => setShow?.(false);

  const handleDeleteUsers = async () => {
    dispatch(deleteUsers(dataDelete.id));
    handleClose();
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
        <span className="font-bold">
          {dataDelete?.email || "người dùng này"}
        </span>
        ?
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

export default ReduxDeleteUsers;
